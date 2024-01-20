import "./style.css";

import { get_auth_data_by_id } from "./utils/get_auth_data_by_id";
import { is_token_expired } from "./utils/check_is_expired";
import { get_access_token_by_rt } from "./utils/get_access_token_by_rt";
import { change_config, config_data } from "./utils/config.data";
import { run_other_codes } from "./utils/run_other_codes";
import { update_auth_data_in_sheet } from "./utils/update_auth_data_in_sheet";
import { change_expiration_date } from "./utils/change_expiration_date";

const main = async () => {
  const url = new URL(location.href);
  const contact_id = url.searchParams.get("contact_id");
  if (!contact_id) return console.log("All parameters are required!");

  try {
    const auth_data = await get_auth_data_by_id(
      config_data.location_id,
      config_data.sheet_url
    );

    if (!auth_data.access_token)
      return console.log("Access token NOT available!");

    change_config("access_token", auth_data.access_token);
    change_config("refresh_token", auth_data.refresh_token);
    change_config("expires_in", auth_data.expires_in);

    const is_expired = is_token_expired(auth_data.expires_in);

    if (is_expired) {
      const new_auth_data = await get_access_token_by_rt(
        config_data.client_id,
        config_data.client_secret,
        config_data.refresh_token
      );

      change_config("access_token", new_auth_data.access_token);
      change_config("refresh_token", new_auth_data.refresh_token);

      const new_expire_date = change_expiration_date(new_auth_data.expires_in);
      change_config("expires_in", new_expire_date);

      await update_auth_data_in_sheet(
        { ...new_auth_data, expires_in: new_expire_date },
        config_data.sheet_url
      );
      run_other_codes(config_data, contact_id, config_data.location_id);
      return;
    }

    run_other_codes(config_data, contact_id, config_data.location_id);
  } catch (error) {
    console.log(error);
  }
};

main();
