import { Box, Button, Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import { getListReview, getProductById } from 'src/services/products';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const listBranch = [
  { value: 0, label: 'Nike' },
  { value: 1, label: 'Adidas' },
  { value: 2, label: 'Merrel' },
  { value: 3, label: 'Gucci' },
  { value: 4, label: 'Skechers' },
];

const listMeterial = [
  { value: 0, label: 'Leather' },
  { value: 1, label: 'Suede' },
];

const listStyle = [
  { value: 0, label: 'Slipons' },
  { value: 1, label: 'Boots' },
  { value: 2, label: 'Sandals' },
  { value: 3, label: 'Laceups' },
  { value: 4, label: 'Oxfords' },
];

const listteChnology = [
  { value: 0, label: 'Biobevel' },
  { value: 1, label: 'Groove' },
  { value: 2, label: 'Flexbevel' },
];

const listColor = [
  { value: 0, label: 'Black' },
  { value: 1, label: 'White' },
  { value: 2, label: 'Blue' },
  { value: 3, label: 'Red' },
  { value: 4, label: 'Green' },
  { value: 5, label: 'Grey' },
  { value: 6, label: 'Orange' },
  { value: 7, label: 'Cream' },
  { value: 8, label: 'Brown' },
];

const listGender = [
  { value: 0, label: 'Male' },
  { value: 1, label: 'Female' },
];

export default function DetailProduct() {
  const [product, setProduct] = useState();
  const [dataReview, setDataReview] = useState([]);

  // const history = useHistory();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const data = location.pathname.lastIndexOf('/');
      const id = location.pathname.slice(data + 1, location.pathname.length);
      const dataProduct = await getProductById(id);
      setProduct(dataProduct.data);

      const dataR = await getListReview(id);
      setDataReview(dataR.data.rows);
    })();
  }, []);

  return (
    <Page title="Detail">
      <Container>
        {product && (
          <Grid container spacing={10}>
            <Grid item xs={6}>
              <img
                src={product.image}
                alt="this is image product"
                width="100%"
                height="cover"
                style={{ objectFit: 'cover', borderRadius: '10px' }}
              />
            </Grid>
            <Grid item xs={6}>
              <Grid
                container
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid #bbb',
                  height: '50px',
                }}
              >
                <Grid item xs={4}>
                  <Box sx={{ fontSize: '16px' }}>Product's Name: </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box>{product.name}</Box>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid #bbb',
                  height: '50px',
                }}
              >
                <Grid item xs={4}>
                  <Box sx={{ fontSize: '16px' }}>Price: </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box>{product.price} $</Box>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid #bbb',
                  height: '50px',
                }}
              >
                <Grid item xs={4}>
                  <Box sx={{ fontSize: '16px' }}>Facturer: </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box>{product.manufacturer}</Box>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '50px',
                  borderBottom: '1px solid #bbb',
                }}
              >
                <Grid item xs={4}>
                  <Box sx={{ fontSize: '16px' }}>Material: </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box>
                    {
                      listMeterial.filter(x => x.value === product.material)[0]
                        .label
                    }
                  </Box>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '50px',
                  borderBottom: '1px solid #bbb',
                }}
              >
                <Grid item xs={4}>
                  <Box sx={{ fontSize: '16px' }}>Style: </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box>
                    {listStyle.filter(x => x.value === product.style)[0].label}
                  </Box>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '50px',
                  borderBottom: '1px solid #bbb',
                }}
              >
                <Grid item xs={4}>
                  <Box sx={{ fontSize: '16px' }}>Technology: </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box>
                    {
                      listteChnology.filter(
                        x => x.value === product.technology,
                      )[0].label
                    }
                  </Box>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  display: 'flex',
                  height: '50px',
                  alignItems: 'center',
                  borderBottom: '1px solid #bbb',
                }}
              >
                <Grid item xs={4}>
                  <Box sx={{ fontSize: '16px' }}>Color: </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box>
                    {listColor.filter(x => x.value === product.color)[0].label}
                  </Box>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '50px',
                  borderBottom: '1px solid #bbb',
                }}
              >
                <Grid item xs={4}>
                  <Box sx={{ fontSize: '16px' }}>Description: </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box>{product.description}</Box>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '50px',
                  borderBottom: '1px solid #bbb',
                }}
              >
                <Grid item xs={4}>
                  <Box sx={{ fontSize: '16px' }}>Size: </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box flexWrap="wrap">
                    {product.listSize.map((x, index) => (
                      <Button variant="contained" sx={{ marginRight: '20px' }}>
                        {x.name}
                      </Button>
                    ))}
                  </Box>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '50px',
                  borderBottom: '1px solid #bbb',
                }}
              >
                <Grid item xs={4}>
                  <Box sx={{ fontSize: '16px' }}>Quantiry: </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box>{product.total_quantity}</Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box
                width="100%"
                border="1px solid #ccc"
                borderRadius="20px"
                padding="20px"
                fontSize="20px"
              >
                <Box maxHeight="400px" sx={{ overflowY: 'scroll' }}>
                  {dataReview.length > 0 ? (
                    <Box>
                      <Box fontWeight={700} marginBottom="20px">
                        Review
                      </Box>
                      {dataReview.map(x => (
                        <Box fontSize="16px" borderBottom="1px solid #ccc">
                          <Grid container>
                            <Grid item xs={2}>
                              Name:{' '}
                            </Grid>
                            <Grid item xs={7}>
                              {x.userName}{' '}
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item xs={2}>
                              Star:{' '}
                            </Grid>
                            <Grid item xs={7}>
                              {console.log(x.star)}
                              <ReactStars
                                count={5}
                                size={20}
                                activeColor="#ffd700"
                                value={x.star}
                                edit={false}
                              />
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item xs={2}>
                              Comment:{' '}
                            </Grid>
                            <Grid item xs={7}>
                              {x.comment}{' '}
                            </Grid>
                          </Grid>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    'There are no reviews yet '
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
}
