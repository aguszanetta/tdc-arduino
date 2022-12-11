import styles from '../styles/Data.module.css'
import Image from 'next/image'
import { useState } from 'react'
import { Modal, Button, Box, Typography } from '@mui/material'
import dataImage from '../public/alerta.png'

export default function Data({ image, title, data, style, setLimit }) {

    const [valueInput, setValueInput] = useState()

    const handleChange = (value) => {
        setValueInput(value)
    }

    const clickButton = () => {
        setLimit(valueInput)
        handleClose()
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className={styles.container}>

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className={styles.modal}>

                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Ingrese valor deseado
                        </Typography>

                        <input className={styles.input} type='number' value={valueInput} onChange={(val) => handleChange(parseInt(val.target.value))} />

                        <Button variant="contained" onClick={() => { clickButton() }}>Guardar</Button>

                    </Box>

                </Modal>
            </div>

            <div className={styles[style]}>
                <Image
                    src={image}
                    alt="Picture"
                    width={100}
                    height={100}
                    className={styles.history_container_image}
                />
                <h2>{title}</h2>
                <div>
                    <h2>{data}</h2>
                </div>
            </div>

            <div className={styles.history_container}>
                <Button onClick={handleOpen}>
                    <Image
                        src={dataImage}
                        width={100}
                        height={100}
                        alt="Picture"
                    />
                </Button>
            </div>

        </div>
    )
}