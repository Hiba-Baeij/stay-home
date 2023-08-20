import { Avatar, Card, Chip, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material'
import { FaEllipsisH } from 'react-icons/fa'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Best } from '@/api/home/dto';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '@/global/auth';

export default function BestShops(props: { bestShops: Best[], bestDrivers: Best[] }) {
    const navigation = useNavigate()
    return (
        <>
            <Card className='col-span 12 md:col-span-4 p-4'>
                <Typography variant="h6" fontWeight={'bold'} fontSize={18}> المتاجر الاكثر طلباً</Typography>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {
                        props.bestShops.map((ele) => {
                            return (
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={getImageUrl(ele.imageUrl)} />
                                    </ListItemAvatar>

                                    <ListItemText
                                        primary={ele.name}

                                    />
                                    <IconButton onClick={() => navigation(`/shop/${ele.id}`)}>
                                        <MoreVertIcon></MoreVertIcon>
                                    </IconButton>
                                </ListItem>

                            )
                        })
                    }

                </List>

            </Card>
            <Card className='col-span 12 md:col-span-4 p-4 mt-5'>
                <Typography variant="h6" fontWeight={'bold'} fontSize={18}> السائقين الاكثر تقييماً</Typography>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {
                        props.bestDrivers.map((ele) => {
                            return (
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={getImageUrl(ele.imageUrl)} />
                                    </ListItemAvatar>

                                    <ListItemText
                                        primary={ele.name}

                                    />
                                    <IconButton onClick={() => navigation(`/driver/${ele.id}`)}>
                                        <MoreVertIcon></MoreVertIcon>
                                    </IconButton>
                                </ListItem>

                            )
                        })
                    }



                </List>

            </Card>
        </>

    )
}
