//React
import React from "react";

//Redux
import { connect } from "react-redux";

//GSAP
import { gsap, Power2, Elastic } from "gsap";

import f from "./../../functions";
import c from "./../../constants";

class index extends React.Component {
  constructor() {
    super();
    this.state = {
      submited: false,
      isSubmitting: false,
      error: null,
      errorField: null,
      name: "",
      email: "",
      phone: "",
      message: "",
    };
    this.successAnimationRef = React.createRef();
  }

  componentDidMount() {}

  playSuccessAnimation = () => {
    if (this.successAnimationRef.current) {
      const container = this.successAnimationRef.current;

      // Reset animation state
      gsap.set(container, { scale: 0, opacity: 0 });
      gsap.set(container.querySelector('.checkmark'), { scale: 0, rotation: -180 });
      gsap.set(container.querySelector('.success-text'), { y: 20, opacity: 0 });

      // Animate container
      gsap.to(container, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: Elastic.easeOut.config(1, 0.5)
      });

      // Animate checkmark
      gsap.to(container.querySelector('.checkmark'), {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        delay: 0.2,
        ease: Elastic.easeOut.config(1, 0.5)
      });

      // Animate text
      gsap.to(container.querySelector('.success-text'), {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: 0.4,
        ease: Power2.easeOut
      });
    }
  };

  submitContactForm = async (e) => {
    e.preventDefault();

    // Clear any previous errors
    this.setState({
      error: null,
      errorField: null,
      isSubmitting: true
    });

    try {
      const response = await f.Api(this.props, "post", "/api/contact", {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone || "",
        message: this.state.message,
      });

      console.log(response);

      // Check if the API returned an error response
      if (!response || response.results === false) {
        // Handle API validation errors
        if (response && response.error) {
          this.setState({
            error: response.error,
            errorField: response.field || null,
            isSubmitting: false
          });
          return;
        }

        // Handle generic error messages
        if (response && response.message) {
          this.setState({
            error: response.message === 'Not Successful' ? response.error : response.message,
            isSubmitting: false
          });
          return;
        }

        // Fallback error
        this.setState({
          error: 'An unexpected error occurred. Please try again.',
          isSubmitting: false
        });
        return;
      }

      // Success - show animation
      this.setState({
        submited: true,
        isSubmitting: false
      });

      setTimeout(() => {
        this.playSuccessAnimation();
      }, 100);

    } catch (error) {
      console.error('Contact form submission error:', error);

      // Handle network errors or other exceptions
      let errorMessage = 'Network error. Please check your connection and try again.';

      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const data = error.response.data;

        switch (status) {
          case 400:
            // Bad Request - validation or bad data
            if (data && data.error) {
              errorMessage = data.error;
            } else if (data && data.message) {
              errorMessage = data.message;
            } else {
              errorMessage = 'Invalid request. Please check your input.';
            }
            break;
          case 405:
            // Method Not Allowed
            errorMessage = 'Invalid request method.';
            break;
          case 429:
            // Too Many Requests - rate limiting
            errorMessage = 'Too many requests. Please wait a moment before trying again.';
            break;
          case 500:
            // Internal Server Error
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = `Error ${status}: ${data?.message || 'Unknown error'}`;
        }
      } else if (error.request) {
        // Network error - no response received
        errorMessage = 'Network error. Please check your connection and try again.';
      }

      this.setState({
        error: errorMessage,
        isSubmitting: false
      });
    }
  };

  clearError = () => {
    this.setState({
      error: null,
      errorField: null
    });
  };

  resetForm = () => {
    this.setState({
      submited: false,
      error: null,
      errorField: null,
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  render() {
    return (
      <>
        <div className={"contact-container"}>
          {/* Animated Code Snippets */}
          <div className="code-snippet">useState('message');</div>
          <div className="code-snippet">npm install @emailjs</div>
          <div className="code-snippet">async function submit()</div>
          <div className="code-snippet">export default Contact</div>

          <form className="my-form" onSubmit={this.submitContactForm}>
            <div className="container" id={"contact"}>
              {this.state.submited === false ? (
                <>
                  <h1>Get in touch!</h1>

                  {/* Error Message Display */}
                  {this.state.error && (
                    <div className="error-message">
                      <div className="error-content">
                        <span className="error-icon">⚠️</span>
                        <span className="error-text">{this.state.error}</span>
                      </div>
                    </div>
                  )}

                  <ul>
                    <li>
                      <div className="grid grid-2">
                        <input
                          type="text"
                          placeholder="Name"
                          required
                          value={this.state.name}
                          className={this.state.errorField === 'name' ? 'error-field' : ''}
                          onChange={(e) => {
                            this.setState({ name: e.target.value });
                            if (this.state.errorField === 'name') {
                              this.clearError();
                            }
                          }}
                        />
                        <input
                          type="tel"
                          placeholder="Phone"
                          value={this.state.phone}
                          className={this.state.errorField === 'phone' ? 'error-field' : ''}
                          onChange={(e) => {
                            this.setState({ phone: e.target.value });
                            if (this.state.errorField === 'phone') {
                              this.clearError();
                            }
                          }}
                        />
                      </div>
                    </li>
                    <li>
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        value={this.state.email}
                        className={this.state.errorField === 'email' ? 'error-field' : ''}
                        onChange={(e) => {
                          this.setState({ email: e.target.value });
                          if (this.state.errorField === 'email') {
                            this.clearError();
                          }
                        }}
                      />
                    </li>
                    <li>
                      <textarea
                        placeholder="Message"
                        required
                        value={this.state.message}
                        className={this.state.errorField === 'message' ? 'error-field' : ''}
                        onChange={(e) => {
                          this.setState({ message: e.target.value });
                          if (this.state.errorField === 'message') {
                            this.clearError();
                          }
                        }}
                      ></textarea>
                    </li>
                    <li>
                      <div className="grid grid-3">
                        <div className="required-msg">REQUIRED FIELDS</div>
                        <button
                          className="btn-grid"
                          type="submit"
                          disabled={this.state.isSubmitting}
                        >
                          <span className="back">
                            {this.state.isSubmitting ? (
                              <span className="loading-spinner">⟳</span>
                            ) : (
                              <img
                                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/email-icon.svg"
                                alt=""
                              />
                            )}
                          </span>
                          <span className="front">
                            {this.state.isSubmitting ? 'SENDING...' : 'SUBMIT'}
                          </span>
                        </button>
                      </div>
                    </li>
                  </ul>
                </>
              ) : (
                <div ref={this.successAnimationRef} className="success-animation">
                  <div className="checkmark">✓</div>
                  <div className="success-text">
                    <h2>Message Sent!</h2>
                    <p>Your message has been sent successfully! I'll get back to you as soon as possible!</p>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        <style jsx>{`
          a {
            color: #22211f;
          }
          p {
            color: white;
            margin-bottom: 20px;
          }

          input,
          select,
          textarea,
          button {
            font-family: "Lato", sans-serif;
            font-size: 100%;
          }

          input::placeholder {
            color: #22211f;
          }
          textarea::placeholder {
            color: #22211f;
          }

          button,
          label {
            cursor: pointer;
          }

          select {
            appearance: none;
          }

          /* Remove native arrow on IE */
          select::-ms-expand {
            display: none;
          }

          /*Remove dotted outline from selected option on Firefox*/
          /*https://stackoverflow.com/questions/3773430/remove-outline-from-select-box-in-ff/18853002#18853002*/
          /*We use !important to override the color set for the select on line 99*/
          select:-moz-focusring {
            color: transparent !important;
            text-shadow: 0 0 0 #afafaf;
          }

          textarea {
            resize: none;
          }

          ul {
            list-style: none;
            padding: 0px;
          }

          .contact-container {
            font: 18px/1.5 "Open Sans", sans-serif;
            background: linear-gradient(135deg, #0c0c0c 0%, #1a0a2e 20%, #0f0f23 40%, #1e0a3c 60%, #2d1b69 80%, #22211f 100%);
            color: #afafaf;
            margin-top: 1.5rem;
            margin-bottom: 0px;
            padding-bottom: 100px;
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;
            padding: 20px;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
          }

          /* Dynamic Matrix-style Background */
          .contact-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
              radial-gradient(circle at 25% 25%, rgba(0, 255, 157, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(255, 0, 255, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 50% 10%, rgba(0, 191, 255, 0.15) 0%, transparent 50%),
              linear-gradient(45deg, transparent 40%, rgba(0, 255, 157, 0.05) 41%, rgba(0, 255, 157, 0.05) 59%, transparent 60%);
            animation: matrix-shift 15s ease-in-out infinite;
            pointer-events: none;
            z-index: 0;
          }

          .contact-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image:
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(0, 255, 157, 0.03) 2px,
                rgba(0, 255, 157, 0.03) 4px
              );
            animation: grid-flow 8s linear infinite;
            pointer-events: none;
            z-index: 0;
          }

          @keyframes matrix-shift {
            0%, 100% {
              background-position: 0% 0%;
              filter: hue-rotate(0deg) brightness(1);
            }
            25% {
              background-position: 10% 10%;
              filter: hue-rotate(90deg) brightness(1.1);
            }
            50% {
              background-position: -10% -10%;
              filter: hue-rotate(180deg) brightness(0.9);
            }
            75% {
              background-position: 5% -5%;
              filter: hue-rotate(270deg) brightness(1.2);
            }
          }

          @keyframes grid-flow {
            0% { transform: translateX(-100px); }
            100% { transform: translateX(100px); }
          }

          .container {
            max-width: 800px;
            padding: 20px;
            position: relative;
            z-index: 2;
            @media only screen and (max-width: 600px) {
              padding: 5px;
            }
          }

          /* Advanced Code Animation System */
          .code-snippet {
            position: absolute;
            font-family: 'Courier New', monospace;
            font-size: 11px;
            color: rgba(0, 255, 157, 0.8);
            white-space: nowrap;
            pointer-events: none;
            z-index: 1;
            border-left: 2px solid rgba(0, 255, 157, 0.5);
            padding-left: 8px;
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(1px);
            border-radius: 4px;
            padding: 4px 8px;
            box-shadow: 0 0 10px rgba(0, 255, 157, 0.2);
            max-width: calc(100vw - 20px);
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .code-snippet:nth-child(1) {
            top: 15%;
            left: 8%;
            animation: code-pulse 6s ease-in-out infinite, code-glow 3s ease-in-out infinite alternate;
          }

          .code-snippet:nth-child(2) {
            top: 40%;
            right: 12%;
            animation: code-pulse 8s ease-in-out infinite 2s, code-glow 4s ease-in-out infinite alternate 1s;
            transform: rotate(-2deg);
          }

          .code-snippet:nth-child(3) {
            bottom: 25%;
            left: 20%;
            animation: code-pulse 10s ease-in-out infinite 4s, code-glow 5s ease-in-out infinite alternate 2s;
            transform: rotate(1deg);
          }

          .code-snippet:nth-child(4) {
            top: 60%;
            right: 5%;
            animation: code-pulse 7s ease-in-out infinite 1s, code-glow 3.5s ease-in-out infinite alternate 0.5s;
            transform: rotate(3deg);
          }

          .code-snippet:nth-child(5) {
            bottom: 10%;
            right: 25%;
            animation: code-pulse 9s ease-in-out infinite 3s, code-glow 4.5s ease-in-out infinite alternate 1.5s;
            transform: rotate(-1deg);
          }

          @keyframes code-pulse {
            0%, 100% {
              opacity: 0.3;
              transform: translateY(0) scale(1);
            }
            25% {
              opacity: 0.8;
              transform: translateY(-5px) scale(1.05);
            }
            50% {
              opacity: 1;
              transform: translateY(-10px) scale(1.1);
              text-shadow: 0 0 10px rgba(0, 255, 157, 0.8);
            }
            75% {
              opacity: 0.8;
              transform: translateY(-5px) scale(1.05);
            }
          }

          @keyframes code-glow {
            0% {
              box-shadow: 0 0 5px rgba(0, 255, 157, 0.3);
              border-left-color: rgba(0, 255, 157, 0.3);
            }
            100% {
              box-shadow: 0 0 20px rgba(0, 255, 157, 0.6), 0 0 30px rgba(0, 255, 157, 0.3);
              border-left-color: rgba(0, 255, 157, 0.8);
            }
          }

          /* FORM ELEMENTS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
          .my-form {
            margin-top: 40px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
          }
          .contact-map {
            width: 600px;
            @media only screen and (max-width: 600px) {
              width: 100%;
            }
          }
          .my-form h1 {
            margin-bottom: 1.5rem;
            color: white;
          }

          .my-form li,
          .my-form .grid > *:not(:last-child) {
            margin-bottom: 1.5rem;
          }

          .my-form select,
          .my-form input,
          .my-form textarea {
            width: 100%;
            line-height: 1.5;
            padding: 15px 10px;
            border: 1px solid hsl(0, 0%, 10%);
            color: #22211f;
            background: rgba(255, 255, 255, 1);
            transition: background-color 0.3s
                cubic-bezier(0.57, 0.21, 0.69, 1.25),
              transform 0.3s cubic-bezier(0.57, 0.21, 0.69, 1.25);
          }

          .my-form button {
            width: 100%;
            line-height: 1.5;
            padding: 15px 10px;
            border: 1px solid hsl(0, 0%, 10%);
            color: white;
            background: hsl(0, 0%, 14%);
            transition: background-color 0.3s
                cubic-bezier(0.57, 0.21, 0.69, 1.25),
              transform 0.3s cubic-bezier(0.57, 0.21, 0.69, 1.25);
          }

          .my-form textarea {
            height: 170px;
          }

          .my-form ::placeholder {
            color: black;
            /*Fix opacity issue on Firefox*/
            opacity: 1;
          }

          .my-form select:focus,
          .my-form input:focus,
          .my-form textarea:focus,
          .my-form button:enabled:hover,
          .my-form button:focus,
          .my-form input[type="checkbox"]:focus + label {
            background: white;
          }

          .my-form select:focus,
          .my-form input:focus,
          .my-form textarea:focus {
            transform: scale(1.02);
          }

          .my-form *:required,
          .my-form select {
            background-repeat: no-repeat;
            background-position: center right 12px;
            background-size: 15px 15px;
          }

          .my-form *:required {
            background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/asterisk.svg);
          }

          .my-form select {
            background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/down.svg);
          }

          .my-form *:disabled {
            cursor: default;
            filter: blur(2px);
          }

          /* FORM BTNS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
          .my-form .required-msg {
            display: none;
            background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/asterisk.svg)
              no-repeat center left / 15px 15px;
            padding-left: 20px;
          }

          .my-form .btn-grid {
            position: relative;
            overflow: hidden;
            transition: filter 0.2s;
          }

          .my-form button {
            font-weight: bold;
          }

          .my-form button > * {
            display: inline-block;
            width: 100%;
            transition: transform 0.4s ease-in-out;
          }

          .my-form button .back {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-110%, -50%);
          }

          .my-form button:enabled:hover .back,
          .my-form button:focus .back {
            transform: translate(-50%, -50%);
          }

          .my-form button:enabled:hover .front,
          .my-form button:focus .front {
            transform: translateX(110%);
          }

          /* CUSTOM CHECKBOX
–––––––––––––––––––––––––––––––––––––––––––––––––– */
          .my-form input[type="checkbox"] {
            position: absolute;
            left: -9999px;
          }

          .my-form input[type="checkbox"] + label {
            position: relative;
            display: inline-block;
            padding-left: 2rem;
            transition: background 0.3s cubic-bezier(0.57, 0.21, 0.69, 1.25);
          }

          .my-form input[type="checkbox"] + label::before,
          .my-form input[type="checkbox"] + label::after {
            content: "";
            position: absolute;
          }

          .my-form input[type="checkbox"] + label::before {
            left: 0;
            top: 6px;
            width: 18px;
            height: 18px;
            border: 2px solid #afafaf;
          }

          .my-form input[type="checkbox"]:checked + label::before {
            background: #e31b23;
          }

          .my-form input[type="checkbox"]:checked + label::after {
            left: 7px;
            top: 7px;
            width: 6px;
            height: 14px;
            border-bottom: 2px solid #afafaf;
            border-right: 2px solid #afafaf;
            transform: rotate(45deg);
          }

          /* FOOTER
–––––––––––––––––––––––––––––––––––––––––––––––––– */
          footer {
            font-size: 1rem;
            text-align: right;
            backface-visibility: hidden;
          }

          footer a {
            text-decoration: none;
          }

          footer span {
            color: #e31b23;
          }

          /* MQ
–––––––––––––––––––––––––––––––––––––––––––––––––– */
          @media screen and (min-width: 600px) {
            .my-form .grid {
              display: grid;
              grid-gap: 1.5rem;
            }

            .my-form .grid-2 {
              grid-template-columns: 1fr 1fr;
            }

            .my-form .grid-3 {
              grid-template-columns: auto auto auto;
              align-items: center;
            }

            .my-form .grid > *:not(:last-child) {
              margin-bottom: 0;
            }

            .my-form .required-msg {
              display: block;
            }
          }

          @media screen and (min-width: 541px) {
            .my-form input[type="checkbox"] + label::before {
              top: 50%;
              transform: translateY(-50%);
            }

            .my-form input[type="checkbox"]:checked + label::after {
              top: 3px;
            }
          }

          /* Mobile Code Snippet Positioning */
          @media only screen and (max-width: 600px) {
            .code-snippet:nth-child(1) {
              left: 5px;
              right: 5px;
              top: 10%;
              font-size: 9px;
            }

            .code-snippet:nth-child(2) {
              left: 5px;
              right: 5px;
              top: 30%;
              font-size: 9px;
            }

            .code-snippet:nth-child(3) {
              left: 5px;
              right: 5px;
              bottom: 20%;
              font-size: 9px;
            }

            .code-snippet:nth-child(4) {
              left: 5px;
              right: 5px;
              top: 50%;
              font-size: 9px;
            }

            .code-snippet:nth-child(5) {
              left: 5px;
              right: 5px;
              bottom: 5%;
              font-size: 9px;
            }
          }

          /* ERROR HANDLING STYLES */
          .error-message {
            background: #ffebee;
            border: 1px solid #f44336;
            border-radius: 8px;
            padding: 12px 16px;
            margin-bottom: 20px;
            animation: slideInError 0.3s ease-out;
          }

          .error-content {
            display: flex;
            align-items: center;
          }

          .error-icon {
            font-size: 18px;
            margin-right: 10px;
            flex-shrink: 0;
          }

          .error-text {
            color: #d32f2f;
            font-weight: 500;
            flex-grow: 1;
            font-size: 14px;
            line-height: 1.4;
          }



          .error-field {
            border-color: #f44336 !important;
            box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2) !important;
            background: rgba(244, 67, 54, 0.05) !important;
          }

          .loading-spinner {
            animation: spin 1s linear infinite;
            font-size: 16px;
            display: inline-block;
          }

          @keyframes slideInError {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          /* SUCCESS ANIMATION STYLES */
          .success-animation {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 40px 20px;
            min-height: 300px;
          }

          .checkmark {
            font-size: 80px;
            color: #4CAF50;
            margin-bottom: 20px;
            font-weight: bold;
            text-shadow: 0 2px 4px rgba(76, 175, 80, 0.3);
          }

          .success-text h2 {
            color: white;
            font-size: 28px;
            margin-bottom: 15px;
            font-weight: 600;
          }

          .success-text p {
            color: #afafaf;
            font-size: 16px;
            line-height: 1.6;
            max-width: 400px;
            margin: 0;
          }

          @media screen and (max-width: 600px) {
            .success-animation {
              padding: 20px 10px;
            }

            .checkmark {
              font-size: 60px;
            }

            .success-text h2 {
              font-size: 24px;
            }

            .success-text p {
              font-size: 14px;
            }
          }

          .retry-button {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            margin-top: 15px;
            transition: background-color 0.3s, transform 0.2s;
          }

          .retry-button:hover {
            background: #45a049;
            transform: translateY(-1px);
          }

          .retry-button:active {
            transform: translateY(0);
          }
        `}</style>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(index);
