import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Product from "../components/Product";
import Footer from "../components/Footer";
import InfoProduct from "../components/InfoProduct";

function ProductInfo() {
    const [camaraPermiso, setCamaraPermiso] = useState(null);

    useEffect(() => {
        async function pedirPermisosCamara() {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                console.log("getUserMedia no está soportado en este navegador");
                setCamaraPermiso(false);
                return;
            }

            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                console.log("Permiso de cámara concedido");
                setCamaraPermiso(true);
                // Asegúrate de detener el stream después de obtener el permiso
                stream.getTracks().forEach(track => track.stop());
            } catch (error) {
                console.error("Permiso de cámara denegado", error);
                setCamaraPermiso(false);
            }
        }

        pedirPermisosCamara();
    }, []);

    return (
        <>
            <Header />
            <Product backPath={"/"}>
                <InfoProduct />
                {camaraPermiso === true && <p>Permiso de cámara concedido</p>}
                {camaraPermiso === false && <p>Permiso de cámara denegado o no soportado</p>}
            </Product>
            <Footer />
        </>
    );
}

export default ProductInfo;