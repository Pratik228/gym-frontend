export default function Register() {
  return (
    <>
      <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-900">
        <div className="sm:mx-auto sm:w-2/5">
          <img
            className="mx-auto w-48"
            src="../../public/img/Logo.png"
            alt="Clothing Store Logo"
          />
          <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-white">
            Create Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a
              href="#"
              className="font-medium text-blue-400 hover:text-blue-500"
            >
              Sign in
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto w-1/4 h-full">
          <div className="bg-gray-800 p-8 shadow rounded-lg h-full">
            <form className="space-y-8" action="#" method="POST">
              <div className="mb-4">
                <label
                  htmlFor="full-name"
                  className="block text-lg font-medium text-gray-300 mb-2"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="full-name"
                    name="full-name"
                    type="text"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-700 px-3 py-2 placeholder-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-lg"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-700 px-3 py-2 placeholder-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-lg"
                  />
                </div>
              </div>

              <div className="relative mb-4 flex space-x-4">
                {/* Password */}
                <div className="w-1/2">
                  <label
                    htmlFor="password"
                    className="block text-lg font-medium text-gray-300 mb-2"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-700 px-3 py-2 placeholder-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-lg"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="w-1/2">
                  <label
                    htmlFor="confirm-password"
                    className="block text-lg font-medium text-gray-300 mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-700 px-3 py-2 placeholder-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-lg"
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
