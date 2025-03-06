import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";

const Faq = () => {
  return (
    <>
      <header className="flex flex-row justify-between p-4  w-screen">
        <Link to="/dashboard" className="text-4xl">
          <IoHome className="hover:text-secondary" />
        </Link>
        <span className="text-3xl font-black">FAQ</span>
        <div></div>
      </header>
      <div className="w-[800px] ml-[400px] mt-24">
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold">
            How do I create an account?
          </div>
          <div className="collapse-content text-sm">
            Click the Sign Up button in the top right corner and follow the
            registration process.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            I forgot my password. What should I do?
          </div>
          <div className="collapse-content text-sm">
            Click on Forgot Password on the login page and follow the
            instructions sent to your email.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            How do I update my profile information?
          </div>
          <div className="collapse-content text-sm">
            Go to My Account settings and select Edit Profile to make changes.
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
