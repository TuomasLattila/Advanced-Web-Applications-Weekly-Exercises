import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next';
//import MyHOC from './MyHOC';

function MyContainer() {
  const { t } = useTranslation();
  //const WrappedWithName = MyHOC(({name}) => {return <div>{name}</div>}, { name: "Kalle" });
  return (
      <div>
        {t("This is the front page")}
      </div>
  )
}

export default function App() {
  return (
    <Suspense fallback="loading"> 
      <MyContainer /> 
    </Suspense>
  );
}