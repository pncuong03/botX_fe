import { withTranslation } from 'next-i18next';

const Layout = ({ children }: any) => {
  return (
    <div className='publiclayout'>
      <div>{children}</div>
    </div>
  );
};

export default withTranslation('common')(Layout);
