import { Layout } from 'antd';
import React from 'react';

const Preloader = React.memo(() => {
   return (
      <Layout className="preloader">
         Loading...
      </Layout>
   );
});

export default Preloader;