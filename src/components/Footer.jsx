import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer() {
  return (
    <div id="footer" className="bg-gray-800 py-16 mt-8 shadow-md">
      <div className="container mx-auto grid grid-cols-4 gap-8">
        <div>
          <h4 className="text-xl font-bold mb-4">About Us</h4>
          <p className="text-sm">Learn more about our mission and values.</p>
        </div>
        <div>
          <h4 className="text-xl font-bold mb-4">Stay Connected</h4>
          <div className="flex space-x-4">
            <FacebookIcon className="hover:text-indigo-500" />
            <TwitterIcon className="hover:text-indigo-500" />
            <InstagramIcon className="hover:text-indigo-500" />
          </div>
        </div>
        <div className="col-span-2 flex flex-col justify-end items-end">
          <div className="text-right">
            <p className="text-sm">
              &copy; 2023 MinimalAura. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
