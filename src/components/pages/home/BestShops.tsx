import { Avatar, Card, Chip, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material'
import { FaEllipsisH } from 'react-icons/fa'
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function BestShops() {
    return (
        <>
            <Card className='col-span 12 md:col-span-4 p-4'>
                <Typography variant="h6" fontWeight={'bold'} fontSize={18}> المتاجر الاكثر طلباً</Typography>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/resturant.jpg" />
                        </ListItemAvatar>

                        <ListItemText
                            primary="مطعم ابو نجيب"

                        />
                        <IconButton>
                            <MoreVertIcon></MoreVertIcon>
                        </IconButton>
                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/shopping.jpg" />
                        </ListItemAvatar>

                        <ListItemText
                            primary="شوبينغ للالبسة"

                        />
                        <IconButton>
                            <MoreVertIcon></MoreVertIcon>
                        </IconButton>
                    </ListItem>


                </List>

            </Card>
            <Card className='col-span 12 md:col-span-4 p-4 mt-5'>
                <Typography variant="h6" fontWeight={'bold'} fontSize={18}> السائقين الاكثر تقييماً</Typography>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/user.jpg" />
                        </ListItemAvatar>

                        <ListItemText
                            primary="Ahmad Hader"

                        />
                        <IconButton>
                            <MoreVertIcon></MoreVertIcon>
                        </IconButton>
                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/albert.jpg" />
                        </ListItemAvatar>

                        <ListItemText
                            primary="Najeb Hallak"

                        />
                        <IconButton>
                            <MoreVertIcon></MoreVertIcon>
                        </IconButton>
                    </ListItem>


                </List>

            </Card>
        </>

    )
}
