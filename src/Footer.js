import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer>
      <p>
        Coded by{' '}
        <a
          href="https://steviegill-webportfolio.netlify.app/"
          title="Stevie's web app portofolio page"
        >
          Stevie Gill
        </a>
        {'; '}
        <a
          href="https://github.com/caffeinated-pixels/25-5-clock"
          title="Pomodoro Clock Github repo"
        >
          <FontAwesomeIcon icon={faGithubSquare} className="githubIcon" /> repo
        </a>
      </p>
    </footer>
  )
}

export default Footer
