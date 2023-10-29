import React, { useEffect } from 'react'

const About = ({ textColor, setProgress }) => {
  useEffect(() => {
    setProgress(15);
    setTimeout(() => {
      setProgress(100);
    }, 1000);

  }, [setProgress]);
  return (
    <div className={`text-${textColor}`} style={{ minHeight: '80vh' }}>
      <h1 className="text-center mt-5">About Us</h1>
      <h5 className='text-center my-3'>Welcome to TextUtils - Your Text Manipulation Companion!</h5>
      <p className='text-center'>TextUtils is more than just a web application; it's a valuable tool designed to simplify and enhance your text-related tasks. Whether you're a writer, student, professional, or anyone who deals with text regularly, TextUtils is here to make your life easier. Our mission is to provide you with a set of user-friendly, efficient, and versatile text manipulation and analysis tools.</p>
      <br />
      <p className='text-center'>TextUtils is more than just a web application; it's a valuable tool designed to simplify and enhance your text-related tasks. Whether you're a writer, student, professional, or anyone who deals with text regularly, TextUtils is here to make your life easier. Our mission is to provide you with a set of user-friendly, efficient, and versatile text manipulation and analysis tools.</p>
      <br />
      <p className='text-center'>At TextUtils, we believe that precision and convenience are key when working with text. The application offers a wide range of features, including text transformation (converting to uppercase, lowercase, or capitalization), removing extra spaces, finding and replacing text, and quick copy-paste functionality. The tools are carefully crafted to streamline your workflow and save you time, allowing you to focus on the content itself.</p>
    <br />
      <p className='text-center'>We're dedicated to ensuring that TextUtils remains a valuable resource for your text editing needs. We value user feedback, so please don't hesitate to reach out with your suggestions or feature requests. We're open-source and welcome contributions from the community, and together, we can make TextUtils even better. Thank you for choosing TextUtils, and we hope it becomes an indispensable part of your text-related work. Explore, enjoy, and simplify your text editing journey with TextUtils!</p>
      <br />
      <p className='text-center'>Join us on this journey to transform the way you work with text. Whether you're looking to clean up text, analyze content, or simply make your life more efficient, TextUtils is here to help. Let's make text manipulation easier and more accessible for everyone.</p>
      <br /><br />
      <p className='text-center'>Thank you for choosing TextUtils. Happy text editing!</p>
      <div className='text-center'>
        <a href="https://github.com/hassancoder1/reactjs-textutils-app/" target='_blank' rel="noreferrer" className='btn btn-warning'> Go to Github Repository</a>
      </div>

      <br /><br /><br />
      <div className='text-center'>
      <small className="text-center">CopyRight &copy; ChatGPT 😎❗</small>
      </div>
    </div>
  )
}

export default About
