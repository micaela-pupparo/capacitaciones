import { Skeleton, Stack } from "@mui/material"

const SkeletonExample = () => {
  return (
    <Stack spacing={2} sx={{ mt: 5, mr: 4 }}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        
        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="circular" width={40} height={40} animation={false} />
        <Skeleton variant="rectangular" width={210} height={60} animation='wave'/>
        <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
  )
}

export default SkeletonExample