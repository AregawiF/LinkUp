import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterMutation, useLoginMutation } from '../api/authApi';

const AuthForms = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register forms
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();
  const [loginUser, { isLoading: isLoggingIn }] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        // Handle login
        const response = await loginUser(data);
        if (response.data) {
          localStorage.setItem('token', response.data.token);
          alert('Login successful!');
        }
      } else {
        // Handle register
        console.log(data); // Log the form data to check the structure
        const response = await registerUser(data);
        if (response.data) {
          alert('Registration successful!');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name input (only for Register) */}
          {!isLogin && (
            <div>
              <div className='mb-5'>
                <label htmlFor="name" className="block text-gray-600 font-medium">Name</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  id="name"
                  type="text"
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
              </div>
              <div>
                <label htmlFor="username" className="block text-gray-600 font-medium">Username</label>
                <input
                  {...register('username', { required: 'Username is required' })}
                  id="username"
                  type="text"
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
              </div>
            </div>
          )}
          {/* Email input */}
          <div>
            <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
            <input
              {...register('email', { required: 'Email is required', pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ })}
              id="email"
              type="email"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>
          {/* Password input */}
          <div>
            <label htmlFor="password" className="block text-gray-600 font-medium">Password</label>
            <input
              {...register('password', { required: 'Password is required', minLength: 6 })}
              id="password"
              type="password"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isRegistering || isLoggingIn}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isRegistering || isLoggingIn ? 'Loading...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        {/* Toggle between Login and Register */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? 'Create an Account' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForms;


// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useRegisterMutation, useLoginMutation } from '../api/authApi';

// const AuthForms = () => {
//   const [isLogin, setIsLogin] = useState(true); // Toggle between login and register forms
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();
//   const [loginUser, { isLoading: isLoggingIn }] = useLoginMutation();

//   const onSubmit = async (data) => {
//     try {
//       if (isLogin) {
//         // Handle login
//         const response = await loginUser(data);
//         console.log('Login response:', response);
//         if (response.data) {
//           localStorage.setItem('token', response.data.token);
//           alert('Login successful!');
//         }
//       } else {
//         // Handle register
//         const response = await registerUser(data);
//         console.log('Register response:', response);
//         if (response.data) {
//           alert('Registration successful!');
//         }
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>{isLogin ? 'Login' : 'Register'}</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {!isLogin && (
//           <div>
//             <label>Username</label>
//             <input
//               {...register('username', { required: 'Username is required' })}
//             />
//             {errors.username && <span>{errors.username.message}</span>}
//           </div>
//         )}
//         <div>
//           <label>Email</label>
//           <input
//             {...register('email', { required: 'Email is required', pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ })}
//           />
//           {errors.email && <span>{errors.email.message}</span>}
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             {...register('password', { required: 'Password is required', minLength: 6 })}
//           />
//           {errors.password && <span>{errors.password.message}</span>}
//         </div>
//         <button type="submit" disabled={isRegistering || isLoggingIn}>
//           {isRegistering || isLoggingIn ? 'Loading...' : isLogin ? 'Login' : 'Register'}
//         </button>
//       </form>

//       <button onClick={() => setIsLogin(!isLogin)}>
//         {isLogin ? 'Create an Account' : 'Already have an account? Login'}
//       </button>
//     </div>
//   );
// };

// export default AuthForms;
