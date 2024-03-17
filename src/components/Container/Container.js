import { ReactNode } from 'react';


const Container = ({ children, className = '' }) => {
  return (
    <div className={`w-full  my-0 mx-auto px-5 ${className}`}>
      { children }
    </div>
  )
}

export default Container;