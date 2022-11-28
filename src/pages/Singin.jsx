console.log("hello");
import { Input, Line, Method } from "../components/form";
export default function Singin() {
  return (
    <main>
      <div className='container'>
        <div className='partOne grid place-content-center mt-20'>
          <h2 className='text-3xl font-black'>Register For Free</h2>
          <span className='font-black text-orange-300 text-center my-5'>with</span>
          <div className='auth-options'>
            <ul className='grid gap-y-2 place-content-center'>
              <Method name='google' theme='bg-red-500' />
              <Method name='facebook' theme='bg-blue-500' />
            </ul>
          </div>
        </div>
        <div className='break-line my-5 flex items-center justify-center'>
          <Line />
          <span className='mx-2 text-gray-500'>OR</span>
          <Line />
        </div>
        <div className='parTow'>
          <h2 className='text-center'>create an account</h2>
          <form className='grid place-content-center'>
            <Input fieldName='username' type='text' placeholder='username' />
            <Input fieldName='email' type='email' placeholder='examle@mail.com' />
            <Input fieldName='password' type='password' placeholder='password' />
          </form>
        </div>
      </div>
    </main>
  );
}
