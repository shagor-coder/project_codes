import get_email_by_ip from "./helpers/get_email_by_ip";
import get_info_by_email from "./helpers/get_info_by_email";
import get_ip_data from "./helpers/get_ip_data";

async function main() {
  try {
    const visitor_ip_data = await get_ip_data();
    const { ip } = visitor_ip_data;
    const visitor_email = await get_email_by_ip(ip);
    const visitor_info = await get_info_by_email(visitor_email);
  } catch (error) {
    console.log("Something went wrong");
  }
}
