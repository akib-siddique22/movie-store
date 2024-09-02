import React from 'react'

const Login = () => {
  return (
    <div class="flex justify-center items-center h-screen">
    <div class="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
      <form>
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">USERNAME</label>
          <input type="text" id="username" name="username" class="form-input mt-1 block w-full h-10 rounded-md shadow-sm border border-black px-3"/>
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">PASSWORD</label>
          <input type="password" id="password" name="password" class="form-input mt-1 block w-full h-10 rounded-md shadow-sm border border-black px-3"/>
        </div>

        <div class="mb-6">
          <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Login