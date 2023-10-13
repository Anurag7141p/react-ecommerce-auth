import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Contact = () => {

  const {user,isAuthenticated}=useAuth0()

  return (
    <Wrapper>
      <h2 className="common-heading">Contact Page</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497699.8399952318!2d77.0076743533839!3d12.953926497498024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1695129795252!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        title="#"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="container">
        <div className="contact-form">

          <form
            action="https://formspree.io/f/mjvqeala"
            className="contact-inputs"
            method="POST"
          >
            <input
              type="text"
              name="Username"
              placeholder="Username"
              required
              autoComplete="off"
              value={isAuthenticated?user.name:""}
            />

            <input
              type="text"
              name="Email"
              placeholder="Email"
              required
              autoComplete="off"
              value={isAuthenticated?user.email:""}
            
            />

            <textarea
              name="Message"
              placeholder="Enter Your Message"
              cols="30"
              rows="10"
              required
              autoComplete="off"
            ></textarea>
            <input type="submit" value="Send" />
          </form>


        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0 5rem 0;
  text-align: center;

  .container {
    margin-top: 6rem;

    .contact-form {
      max-width: 50rem;
      margin: auto;

      .contact-inputs {
        display: flex;
        flex-direction: column;
        gap: 3rem;

        input[type="submit"] {
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background-color: ${({ theme }) => theme.colors.white};
            border: 1px solid ${({ theme }) => theme.colors.btn};
            color: ${({ theme }) => theme.colors.btn};
            transform: scale(0.9);
          }
        }
      }
    }
  }
`;

export default Contact;
