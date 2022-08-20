import { motion } from 'framer-motion'
import styled from 'styled-components'

const RainbowStripeContainer = styled(motion.svg)`
    width: 100vw;
    height: 50px;
    align-self: center;
    margin: 30px 0;

    shape-rendering: crispedges;

    @media only screen and (min-width: 900px) {
        margin-top: 10vh;
    }
`

export default function RainbowStripe() {
    const colors = ['#e40303', '#ff8c00', '#ffed00', '#008026', '#004dff', '#750787']

    const stripeContainer = {
        hidden: {
            
        },
        show: {
            transition: {
                staggerChildren: .1,
                staggerDirection: -1,
            },
        },
    }

    const stripeItem = {
        hidden: {
            width: '0%',
        },
        show: {
            width: '100%',
            transition: {
                duration: .5,
            },
        },
    }

    return (
        <RainbowStripeContainer
            initial='hidden'
            animate='show'
            variants={stripeContainer}

            viewBox='0 0 1 6' 
            preserveAspectRatio='none'>
            {colors.map((color, index) => {
                return (
                    <motion.rect
                        key={'stripe' + index}

                        variants={stripeItem}

                        x='0'
                        y={index}
                        width='100%'
                        height='1'
                        fill={color} 
                    />
                )
            })}
        </RainbowStripeContainer>
    )
}
