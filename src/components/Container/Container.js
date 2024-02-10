import { ReactNode } from 'react';


const Container = ({ children, className = '' }) => {
  return (
    <div className={`w-full max-w-7xl my-0 mx-auto px-5 ${className}`}>
      { children }
    </div>
  )
}

export default Container;