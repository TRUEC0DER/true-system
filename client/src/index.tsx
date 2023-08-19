import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/global.scss';
import '@/styles/variables.scss';
import '@/styles/zeroing.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "@/pages/Home";
import Policy from "@/pages/Policy";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Contacts from "@/pages/Contacts";
import NotFound from "@/pages/NotFound";
import Purchase from "@/pages/Purchase";
import Success from "@/pages/Success";
import Fail from "@/pages/Fail";
import ThemeProvider from '@/providers/ThemeProvider';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <Header/>
                <main>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/policy" element={<Policy/>}/>
                        <Route path="/contacts" element={<Contacts/>}/>
                        <Route path="/purchase" element={<Purchase/>}/>
                        <Route path="/success" element={<Success/>}/>
                        <Route path="/fail" element={<Fail/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </main>
                <Footer/>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
