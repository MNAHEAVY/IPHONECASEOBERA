import logo from "../../assets/logo.png";

const Loader = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='absolute w-[30vh] h-[30vh] border-[1.5vw] border-t-black border-solid border-gray-300 rounded-full animate-spin'></div>

      <div className='flex items-center justify-center'>
        <img src={logo} alt='Loader' className='w-[20vh] animate-fade' />
      </div>
    </div>
  );
};

export default Loader;
