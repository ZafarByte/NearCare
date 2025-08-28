import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify'; // Optional: remove this line if not using toast
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);

  const [state, setState] = useState('Sign Up');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (loading) return;
  
    try {
      if (state === 'Sign Up') {
        const res = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
  
        const data = res.data;
  
        if (data.success) {
          toast.success("Registered Successfully 🎉");
          localStorage.setItem('token', data.token);
          setToken(data.token);
          setState('Login');
        } else {
          toast.error(data.message);
        }
  
      } else {
        const res = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
  
        const data = res.data;
  
        if (data.success) {
          toast.success("Login Success");
          localStorage.setItem('token', data.token);
          setToken(data.token);
          navigate('/')
        } else {
          toast.error(data.message);
        }
      }
  
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>
        <p>Please {state === 'Sign Up' ? 'Sign Up' : 'Login'} to book appointment</p>

        {state === 'Sign Up' && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#0f172a] text-white w-full py-2 rounded-md text-base"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              className="text-[#0f172a] underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{' '}
            <span
              onClick={() => setState('Sign Up')}
              className="text-[#0f172a] underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
