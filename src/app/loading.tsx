import * as React from 'react';
import Image from 'next/image';

export default function Loading(): React.JSX.Element {
  return (
    <div className="app-loader">
      <div className="app-loader__ring" />
      <Image alt="Jnana AI Management System" className="app-loader__logo" height={40} src="/logo.png" width={40} />
      <div className="app-loader__text">Loading...</div>
    </div>
  );
}
