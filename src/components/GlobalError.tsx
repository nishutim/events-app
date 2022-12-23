import React, { FC } from 'react';
import { Layout } from 'antd';

interface Props {
   message: string;
}

const GlobalError: FC<Props> = React.memo(({ message }) => {
   return (
      <Layout className="globalError">
         {message}
      </Layout>
   );
});

export default GlobalError;