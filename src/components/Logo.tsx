import netflixLogo from '../assets/netflix-3.svg'
import { useNavigate } from 'react-router-dom';

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({className}) => {
    let navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    }
    return (
        <img src={netflixLogo} alt="Netflix Logo" className={`cursor-pointer ${className}`} onClick={handleClick} />
    )
}

export default Logo;
