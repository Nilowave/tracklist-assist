import { ClickAwayListener, debounce } from '@mui/material';
import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import * as S from './M03SearchInput.styles';
import { useCardsStore } from '../../../api/cards';
import { M02IconButton } from '../M02IconButton/M02IconButton';

export const M03SearchInput = (): ReactElement => {
  const fetchCards = useCardsStore((state) => state.fetchCards);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [query, setQuery] = useState<string>();

  const hideSearch = () => {
    setIsActive(false);
  };

  const debouncedSearch = debounce((searchTerm) => fetchCards(searchTerm), 300);

  const onToggleClick = () => {
    setIsActive(true);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
  };

  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      hideSearch();
    }
  };

  useEffect(() => {
    debouncedSearch(query);

    return () => {
      debouncedSearch.clear();
    };
  }, [query]);

  useEffect(() => {
    if (isActive) {
      document.addEventListener('keydown', onKeyPress);
    } else {
      document.removeEventListener('keydown', onKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', onKeyPress);
    };
  }, [isActive]);

  return (
    <S.StyledM03SearchInput>
      <M02IconButton icon="search" onClick={onToggleClick} />
      {isActive && (
        <ClickAwayListener onClickAway={hideSearch}>
          <S.SearchWrapper $row $gap="0.5rem" $align="center">
            <S.SearchInput type="text" name="search" defaultValue={query} onChange={onChange} autoFocus placeholder="Search" />
            <S.SearchIcon name="search" size={19} />
          </S.SearchWrapper>
        </ClickAwayListener>
      )}
    </S.StyledM03SearchInput>
  );
};
