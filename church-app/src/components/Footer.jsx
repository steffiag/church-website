function Footer() {
  return (
    <footer className="footer">
      <div className="footer-col reveal">
        <h2>Contact Us</h2>
        <div className="footer-details">
          <div className="footer-address">
            <p>173 North Washington Avenue</p>
            <p>Bergenfield, NJ 07621</p>
            <p>United States</p>
          </div>
          <div className="footer-contact">
            <p><a href="/about/#leadership" className="footer-call">Call Us</a></p>
            <p><a href="mailto:stmarysbergen@gmail.com" className="email-link">stmarysbergen@gmail.com</a></p>
          </div>
        </div>
        <p className="credit">Website Developed by Steffia George</p>
      </div>

      <div className="footer-col footer-social reveal">
        <div className="social-circles">
          <a href="https://www.facebook.com/share/19YJ2tV2sH/?mibextid=wwXIfr" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 256 256" aria-hidden="true">
              <path d="M128,25.6c-56.55,0 -102.4,45.85 -102.4,102.4c0,51.34 37.82,93.73 87.09,101.14v-73.98h-25.34v-26.91h25.34v-17.91c0,-29.65 14.45,-42.67 39.09,-42.67c11.8,0 18.05,0.88 21,1.27v23.49h-16.81c-10.46,0 -14.11,9.92 -14.11,21.1v14.72h30.66l-4.16,26.91h-26.5v74.21c49.98,-6.78 88.54,-49.51 88.54,-101.37c0,-56.55 -45.85,-102.4 -102.4,-102.4z" />
            </svg>
          </a>
          <a href="https://www.youtube.com/@stmarysbergen" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <svg viewBox="0 0 30 30" aria-hidden="true">
              <path d="M15,4c-4.19,0 -9.62,1.05 -9.62,1.05l-0.01,0.01c-1.91,0.31 -3.37,1.95 -3.37,3.94v12a4,4 0 0,0 3.38,3.95l0,0c0,0 5.43,1.05 9.62,1.05c4.19,0 9.62,-1.05 9.62,-1.05l0,0a4,4 0 0,0 3.38,-3.95v-12a4,4 0 0,0 -3.38,-3.95l0,0c0,0 -5.43,-1.05 -9.62,-1.05zM12,10.4l8,4.6l-8,4.6z" />
            </svg>
          </a>
          <a href="https://www.instagram.com/stmarys_bergenfield/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 256 256" aria-hidden="true">
              <path d="M85.32,25.6c-32.93,0 -59.72,26.81 -59.72,59.75v85.33c0,32.93 26.81,59.72 59.75,59.72h85.33c32.93,0 59.72,-26.81 59.72,-59.75v-85.33c0,-32.93 -26.81,-59.72 -59.75,-59.72zM187.73,59.73c4.71,0 8.53,3.82 8.53,8.53c0,4.71 -3.82,8.53 -8.53,8.53c-4.71,0 -8.53,-3.82 -8.53,-8.53c0,-4.71 3.82,-8.53 8.53,-8.53zM128,76.8c28.24,0 51.2,22.96 51.2,51.2c0,28.24 -22.96,51.2 -51.2,51.2c-28.24,0 -51.2,-22.96 -51.2,-51.2c0,-28.24 22.96,-51.2 51.2,-51.2zM128,93.87c-18.85,0 -34.13,15.28 -34.13,34.13c0,18.85 15.28,34.13 34.13,34.13c18.85,0 34.13,-15.28 34.13,-34.13c0,-18.85 -15.28,-34.13 -34.13,-34.13z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;