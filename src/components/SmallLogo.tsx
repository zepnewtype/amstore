
import { Link } from 'react-router-dom';

const SmallLogo = () => {
  return (
    <Link to="/" className="block">
      <img 
        src="https://cdn.shopify.com/s/files/1/0592/5152/3702/files/LOGO_SMALL_f7cb0a9e-20a8-4252-afcd-66f1c84efa95.svg?v=1735224856" 
        alt="Amprio Milano" 
        className="h-8"
      />
    </Link>
  );
};

export default SmallLogo;
