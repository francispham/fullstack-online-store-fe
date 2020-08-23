import PleaseSignin from '../components/PleaseSignin';
import Permissions from '../components/Permissions';

const PermissionsPage = props => {
  return (
    <div>
      <PleaseSignin>
        <Permissions />
      </PleaseSignin>
    </div>
  );
};

export default PermissionsPage;
