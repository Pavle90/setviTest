import React from 'react';
import { Link } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, Container, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchItems } from '../services/itemServices';
import { Item } from '../types/ItemTypes'


const HomePage: React.FC = () => {
  const {
    isPending,
    isError,
    data: items,
  } = useQuery<Item[]>({
    queryKey: ['items'],
    queryFn: fetchItems,
  });
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  return (
    <Container sx={{margin:'auto', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-around'}}>
      <Button variant="contained" sx={{marginTop:5}}component={Link} to="/create">
        Create Item
      </Button>
      <h4>List of Items</h4>
      <List sx={{width:300}}>
        {items?.map((item: Item) => (
          <ListItem key={item.id}>
            <Link to={`/details/${item.id}`} style={{ textDecoration: 'none' }}>
                <Typography sx={{width:300}} noWrap>
                {item.title}
                </Typography>
            </Link>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
export default HomePage;
