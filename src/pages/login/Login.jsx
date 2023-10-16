export default function Login() {
  return (
    <>
      <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-900">
        <div className="sm:mx-auto sm:w-2/5">
          <img
            className="mx-auto w-48"
            src="../../public/img/Logo.png"
            alt="Clothing Store Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Welcome to Our Clothing Store
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            New here?{" "}
            <a
              href="#"
              className="font-medium text-blue-400 hover:text-blue-500"
            >
              Create your account
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto w-1/4 h-full">
          <div className="bg-gray-800 p-16 shadow rounded-lg h-full">
            <form className="space-y-8" action="#" method="POST">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-300 mb-2"
                >
                  Email address
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

              <div className="relative mb-4">
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
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-700 px-3 py-2 placeholder-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-lg"
                  />
                  {/* Add an eye icon here for password visibility */}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-700 text-blue-500 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-gray-300"
                  >
                    Remember me
                  </label>
                </div>

                <a href="#" className="text-blue-400 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
