import { memo } from 'react';
import styled from 'styled-components';
import List from '../List';

const ListContainer = styled.article``;


interface ListContentProps {
  id: number;
}

const ListContent = ({ id }: ListContentProps) => {
  return (
    <ListContainer>
      <List id={id} />
    </ListContainer>
  );
};

export default memo(ListContent);