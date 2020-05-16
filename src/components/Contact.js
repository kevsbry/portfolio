import React, { useRef } from "react";

function Contact() {
  const formRef = useRef();

  const onFormSubmit = (e) => {
    e.preventDefault();
    let isEmpty = false;
    let inputContainer = formRef.current.querySelector(".input-container");
    let inputs = inputContainer.querySelectorAll("input");
    let message = inputContainer.querySelector("textarea");

    inputs.forEach((el) => {
      if (el.value === "") {
        isEmpty = true;
      }
    });

    if (isEmpty === false && message.value !== "") formRef.current.submit();
    else alert("Fill all Fields!");
  };

  return (
    <form
      ref={formRef}
      className="contact"
      action="https://formspree.io/xdowkjyd"
      method="POST"
      onSubmit={onFormSubmit}
    >
      <span>contact me</span>
      <div className="input-container">
        <div>
          <input type="text" name="name" placeholder="Full Name" />
          <input type="email" name="_replyto" placeholder="Email" />
        </div>
        <input type="text" name="subject" placeholder="Subject" />
        <textarea name="message" placeholder="Message"></textarea>
      </div>
      {/* <button>send</button> */}
      <input className="contact-submit" type="submit" value="Send" />
    </form>
  );
}

export default Contact;
