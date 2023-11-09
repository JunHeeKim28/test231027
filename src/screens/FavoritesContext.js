import React, {createContext, useContext, useState} from 'react';

//createContext() 함수를 사용하여 FavoritesContext를 생성해.
//이 컨텍스트는 공유할 상태와 관련된 함수들을 포함할 거야.
const FavoritesContext = createContext();

//현재 컴포넌트가 FavoritesContext의 값을 사용할 수 있도록 하는 훅이야.
export const useFavorites = () => {
  return useContext(FavoritesContext);
};

//상태를 관리하고, 이 상태와 관련된 함수들을
//하위 컴포넌트에 전달하는 컨텍스트 제공자(provider)야.
//useState를 사용하여 초기값이 빈 배열인 favorites 상태를 생성해.
export const FavoritesProvider = ({children}) => {
  const [favorites, setFavorites] = useState([]);

  //addFavorite 함수는 새로운 항목을 받아와서
  //현재의 favorites 배열에 추가하는 역할을 하는 함수야.
  const addFavorite = item => {
    setFavorites([...favorites, item]);
  };

  //FavoritesContext.Provider를 사용하여
  //하위 컴포넌트에 값을 제공하는 Provider를 렌더링해.
  //value prop에는 상태와 함수들을 담은 객체를 전달해.
  return (
    <FavoritesContext.Provider value={{favorites, addFavorite}}>
      {children}
    </FavoritesContext.Provider>
  );
  //FavoritesProvider 컴포넌트로 감싼 하위 컴포넌트들은 useFavorites 훅을 사용하여
  //favorites 상태와 addFavorite 함수를 이용할 수 있게 될 거야.
};
