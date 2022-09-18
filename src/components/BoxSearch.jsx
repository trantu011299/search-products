import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { products } from '../data/data';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { red } from '@mui/material/colors';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'black',
    },
    '&:hover fieldset': {
      borderColor: 'green',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

const BoxSearch = () => {
    const [listProducts, setListProducts] = useState([])
    const [showSuggest, setShowSuggest] = useState(false)
    const [keySearch, setKeySearch] = useState()

    useEffect(() => {
        if(keySearch){
            const mapProducts = products.filter((item) => item.title.toLowerCase().includes(keySearch.toLowerCase()))
            setListProducts(mapProducts)
        }
    },[keySearch, showSuggest])

    const onSearchProducts = (value) => {
        setKeySearch(value);
    }

    const formatCurr = (price) => {
        let y = Number(Math.round(Number(price + 'e' + 0)) + 'e-' + 0)
        let z = y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        return z + '₫'
    }

    const percentage = (price,compare_at_price) => {
        let onePer = compare_at_price/100
        let discount = price / onePer
        return Math.ceil(100-discount) + '%'
    }
    
    return (
        <div className="BoxSearch" >
            <CssTextField 
                value={keySearch}
                onClick={() => {
                    setShowSuggest(true)
                }} 
                onBlur={() => {
                    setShowSuggest(false)
                    setListProducts([])
                }} 
                onChange={(e) => onSearchProducts(e.target.value)}
                label="Tìm kiếm" 
                id="custom-css-outlined-input" 
            />
            {
                showSuggest && ( 
                    listProducts.length === 0 ? (
                        !keySearch ? (
                            <>
                                <div className="suggestSearch">
                                    {Array.isArray(products) && products.map((item) => {
                                        return (
                                            <List key={item.id} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                <ListItem alignItems="flex-start">
                                                    <Tooltip title={
                                                        <div>
                                                            <p>Cho phép mua bất kể số lượng: {item.variants[0].inventory_management !== null ? "Cho phép" : "Không cho phép"}
                                                            </p>
                                                            <p>Cho phép đặt hàng khi kho hết hàng: {item.variants[0].inventory_policy === 'allow' ? "Cho phép" : "Không cho phép"}
                                                            </p>
                                                            <p>Số lượng hàng trong kho: {item.variants[0].inventory_quantity}</p>
                                                        </div>
                                                    }
                                                    TransitionComponent={Zoom}
                                                    TransitionProps={{ timeout: 600 }}>
                                                        <ListItemAvatar>
                                                        <Avatar alt={item.image.id} src={item.image.src} />
                                                        </ListItemAvatar>
                                                    </Tooltip>
                                                    <ListItemText
                                                    primary={
                                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                                            <div style={{textDecoration: item.variants[0].inventory_quantity !== 0 ? 'none' : 'line-through'}}>
                                                            <span style={{marginRight: 5}}>{`${item.title}`}</span>
                                                            {
                                                                item.variants[0].price !== item.variants[0].compare_at_price && (
                                                                    <Chip color="error" label={percentage(item.variants[0].price, item.variants[0].compare_at_price)} />
                                                                )
                                                            }
                                                            </div>
                                                            <span style={{marginLeft: 5, color: 'red'}}>{item.variants[0].inventory_quantity !== 0 ? '' : 'HẾT HÀNG'}</span>
                                                        </div>
                                                    }
                                                    secondary={
                                                        <div>
                                                            <div style={{textDecoration: item.variants[0].inventory_quantity !== 0 ? 'none' : 'line-through'}}>
                                                                <Typography
                                                                    sx={{ display: 'inline' }}
                                                                    component="span"
                                                                    variant="body2"
                                                                    color="text.primary"
                                                                >
                                                                    {`${formatCurr(item.variants[0].compare_at_price)} `}
                                                                </Typography>
                                                                {
                                                                    item.variants[0].price !== item.variants[0].compare_at_price && (
                                                                        <>
                                                                            giảm giá còn <span style={{color: 'red'}}>{formatCurr(item.variants[0].price)}</span>
                                                                        </>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    }
                                                    />
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                            </List>
                                        )
                                    })}
                                </div>
                            </>
                        ) : (
                            <div className="suggestSearch">
                                <p style={{margin: "10px", color: 'red'}}>Không tìm thấy sản phẩm phù hợp!</p>
                            </div>
                        )
                    ) :(
                        <div className="suggestSearch">
                            {Array.isArray(listProducts) && listProducts.map((item) => {
                                return (
                                    <List key={item.id} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        <ListItem alignItems="flex-start">
                                            <Tooltip title={
                                                <div>
                                                    <p>Cho phép mua bất kể số lượng: {item.variants[0].inventory_management !== null ? "Cho phép" : "Không cho phép"}
                                                    </p>
                                                    <p>Cho phép đặt hàng khi kho hết hàng: {item.variants[0].inventory_policy === 'allow' ? "Cho phép" : "Không cho phép"}
                                                    </p>
                                                    <p>Số lượng hàng trong kho: {item.variants[0].inventory_quantity}</p>
                                                </div>
                                            }
                                            TransitionComponent={Zoom}
                                            TransitionProps={{ timeout: 600 }}>
                                                <ListItemAvatar>
                                                <Avatar alt={item.image.id} src={item.image.src} />
                                                </ListItemAvatar>
                                            </Tooltip>
                                            <ListItemText
                                            primary={
                                                <div style={{display: 'flex', alignItems: 'center'}}>
                                                    <div style={{textDecoration: item.variants[0].inventory_quantity !== 0 ? 'none' : 'line-through'}}>
                                                    <span style={{marginRight: 5}}>{`${item.title}`}</span>
                                                    {
                                                        item.variants[0].price !== item.variants[0].compare_at_price && (
                                                            <Chip color="error" label={percentage(item.variants[0].price, item.variants[0].compare_at_price)} />
                                                        )
                                                    }
                                                    </div>
                                                    <span style={{marginLeft: 5, color: 'red'}}>{item.variants[0].inventory_quantity !== 0 ? '' : 'HẾT HÀNG'}</span>
                                                </div>
                                            }
                                            secondary={
                                                <div>
                                                    <div style={{textDecoration: item.variants[0].inventory_quantity !== 0 ? 'none' : 'line-through'}}>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {`${formatCurr(item.variants[0].compare_at_price)} `}
                                                        </Typography>
                                                        {
                                                            item.variants[0].price !== item.variants[0].compare_at_price && (
                                                                <>
                                                                    giảm giá còn <span style={{color: 'red'}}>{formatCurr(item.variants[0].price)}</span>
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </List>
                                )
                            })}
                        </div>
                    )
                )
            }
        </div>
    );
}

export default BoxSearch
