import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PlayerInfo.css';

const PlayerInfo = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [player, setPlayer] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPlayerInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/player/${username}`, { withCredentials: true });
                setPlayer(response.data);
            } catch (error) {
                setError('An error occurred while fetching player info.');
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
        };

        fetchPlayerInfo();
    }, [username, navigate]);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!player) {
        return <div>Loading...</div>;
    }

    const avatarURL = `https://crafatar.com/avatars/${player.info.uuid}?size=120&default=MHF_Steve&overlay`;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header text-center">
                    <h6 className="col-black">
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="address-book" className="svg-icon svg-inline--fa fa-address-book" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M384 48c8.8 0 16 7.2 16 16V448c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H384zM96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM240 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zm-32 32c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H336c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H208zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z"></path>
                        </svg>
                        {username}
                    </h6>
                </div>
                <div className="card-body" id="card-body-player-overview-card">
                    <div className="row">
                        <div className="col-4">
                            <p>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" className="svg-icon svg-inline--fa fa-circle col-green" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path>
                                </svg>
                                {player.info.online ? ' Online' : ' Offline'}
                            </p>
                            {player.info.operator && (
                                <p>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="superpowers" className="svg-icon svg-inline--fa fa-superpowers col-blue" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="currentColor" d="M448 32c-83.3 11-166.8 22-250 33-92 12.5-163.3 86.7-169 180-3.3 55.5 18 109.5 57.8 148.2L0 480c83.3-11 166.5-22 249.8-33 91.8-12.5 163.3-86.8 168.7-179.8 3.5-55.5-18-109.5-57.7-148.2L448 32zm-79.7 232.3c-4.2 79.5-74 139.2-152.8 134.5-79.5-4.7-140.7-71-136.3-151 4.5-79.2 74.3-139.3 153-134.5 79.3 4.7 140.5 71 136.1 151z"></path>
                                    </svg>
                                    {' Operator'}
                                </p>
                            )}
                            <p>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="gavel" className="svg-icon svg-inline--fa fa-gavel col-brown" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M318.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-120 120c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l4-4L325.4 293.4l-4 4c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l120-120c12.5-12.5 12.5-32.8 0-45.3l-16-16c-12.5-12.5-32.8-12.5-45.3 0l-4 4L330.6 74.6l4-4c12.5-12.5 12.5-32.8 0-45.3l-16-16zm-152 288c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l48 48c12.5 12.5 32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-1.4-1.4L272 285.3 226.7 240 168 298.7l-1.4-1.4z"></path>
                                </svg>
                                {' Times Kicked: ' + player.info.kick_count}
                            </p>
                        </div>
                        <div className="col-4">
                            <img className="rounded mx-auto d-block" alt="player head" src={avatarURL} />
                        </div>
                        <div className="col-4">
                            <p>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="crosshairs" className="svg-icon svg-inline--fa fa-crosshairs col-red" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M256 0c17.7 0 32 14.3 32 32V42.4c93.7 13.9 167.7 88 181.6 181.6H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H469.6c-13.9 93.7-88 167.7-181.6 181.6V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V469.6C130.3 455.7 56.3 381.7 42.4 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H42.4C56.3 130.3 130.3 56.3 224 42.4V32c0-17.7 14.3-32 32-32zM107.4 288c12.5 58.3 58.4 104.1 116.6 116.6V384c0-17.7 14.3-32 32-32s32 14.3 32 32v20.6c58.3-12.5 104.1-58.4 116.6-116.6H384c-17.7 0-32-14.3-32-32s14.3-32 32-32h20.6C392.1 165.7 346.3 119.9 288 107.4V128c0 17.7-14.3 32-32 32s-32-14.3-32-32V107.4C165.7 119.9 119.9 165.7 107.4 224H128c17.7 0 32 14.3 32 32s-14.3 32-32 32H107.4zM256 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path>
                                </svg>
                                {' Player Kills: ' + player.info.player_kill_count}
                            </p>
                            <p>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="crosshairs" className="svg-icon svg-inline--fa fa-crosshairs col-green" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M256 0c17.7 0 32 14.3 32 32V42.4c93.7 13.9 167.7 88 181.6 181.6H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H469.6c-13.9 93.7-88 167.7-181.6 181.6V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V469.6C130.3 455.7 56.3 381.7 42.4 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H42.4C56.3 130.3 130.3 56.3 224 42.4V32c0-17.7 14.3-32 32-32zM107.4 288c12.5 58.3 58.4 104.1 116.6 116.6V384c0-17.7 14.3-32 32-32s32 14.3 32 32v20.6c58.3-12.5 104.1-58.4 116.6-116.6H384c-17.7 0-32-14.3-32-32s14.3-32 32-32h20.6C392.1 165.7 346.3 119.9 288 107.4V128c0 17.7-14.3 32-32 32s-32-14.3-32-32V107.4C165.7 119.9 119.9 165.7 107.4 224H128c17.7 0 32 14.3 32 32s-14.3 32-32 32H107.4zM256 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path>
                                </svg>
                                {' Mob Kills: ' + player.info.mob_kill_count}
                            </p>
                            <p>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="skull" className="svg-icon svg-inline--fa fa-skull" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M416 398.9c58.5-41.1 96-104.1 96-174.9C512 100.3 397.4 0 256 0S0 100.3 0 224c0 70.7 37.5 133.8 96 174.9c0 .4 0 .7 0 1.1v64c0 26.5 21.5 48 48 48h48V464c0-8.8 7.2-16 16-16s16 7.2 16 16v48h64V464c0-8.8 7.2-16 16-16s16 7.2 16 16v48h48c26.5 0 48-21.5 48-48V400c0-.4 0-.7 0-1.1zM96 256a64 64 0 1 1 128 0A64 64 0 1 1 96 256zm256-64a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path>
                                </svg>
                                {' Deaths: ' + player.info.death_count}
                            </p>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-lg-6">
                            <p title={`Total Playtime: ${player.info.playtime}`}>
                                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="clock" className="svg-icon svg-inline--fa fa-clock col-green" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path>
                                </svg>
                                {' Total Playtime'}
                                <span className="float-end">{player.info.playtime}</span>
                            </p>
                            <p title={`Total Active: ${player.info.active_playtime}`}>
                                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="clock" className="svg-icon svg-inline--fa fa-clock col-green" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path>
                                </svg>
                                {' Total Active'}
                                <span className="float-end">{player.info.active_playtime}</span>
                            </p>
                            <p title={`Total AFK: ${player.info.afk_time}`}>
                                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="clock" className="svg-icon svg-inline--fa fa-clock col-grey" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path>
                                </svg>
                                {' Total AFK'}
                                <span className="float-end">{player.info.afk_time}</span>
                            </p>
                            <hr />
                            <p title={`Sessions: ${player.info.session_count}`}>
                                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar-check" className="svg-icon svg-inline--fa fa-calendar-check col-teal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M128 0c13.3 0 24 10.7 24 24V64H296V24c0-13.3 10.7-24 24-24s24 10.7 24 24V64h40c35.3 0 64 28.7 64 64v16 48V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192 144 128C0 92.7 28.7 64 64 64h40V24c0-13.3 10.7-24 24-24zM400 192H48V448c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V192zM329 297L217 409c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47 95-95c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path>
                                </svg>
                                {' Sessions'}
                                <span className="float-end"><b>{player.info.session_count}</b></span>
                            </p>
                            <p title={`Longest Session: ${player.info.longest_session_length}`}>
                                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="clock" className="svg-icon svg-inline--fa fa-clock col-teal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path>
                                </svg>
                                {' Longest Session'}
                                <span className="float-end">{player.info.longest_session_length}</span>
                            </p>
                            <p title={`Session Median: ${player.info.session_median}`}>
                                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="clock" className="svg-icon svg-inline--fa fa-clock col-teal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path>
                                </svg>
                                {' Session Median'}
                                <span className="float-end">{player.info.session_median}</span>
                            </p>
                            <hr />
                            <p title={`Registered: ${player.info.registered}`}>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-plus" className="svg-icon svg-inline--fa fa-user-plus col-light-green" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                    <path fill="currentColor" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
                                </svg>
                                <b> Registered</b>
                                <span className="float-end">{player.info.registered}</span>
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <p title="Activity Index">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-icon svg-inline--fa fa-user col-amber" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path>
                                </svg>
                                {' Activity Index '}
                                <span className="float-end">
                                    <b>{player.info.activity_index}</b> (Inactive)
                                </span>
                            </p>
                            <p title={`Favorite Server: ${player.info.favorite_server}`}>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="server" className="svg-icon svg-inline--fa fa-server col-light-green" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm48 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM64 288c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V352c0-35.3-28.7-64-64-64H64zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm56 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"></path>
                                </svg>
                                {' Favorite Server'}
                                <span className="float-end">{player.info.favorite_server}</span>
                            </p>
                            <p title={`Join Address: ${player.info.latest_join_address}`}>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="location-arrow" className="svg-icon svg-inline--fa fa-location-arrow col-amber" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"></path>
                                </svg>
                                {' Join Address'}
                                <span className="float-end">{player.info.latest_join_address}</span>
                            </p>
                            <hr />
                            <p title={`Average Ping: ${player.info.average_ping}`}>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="signal" className="svg-icon svg-inline--fa fa-signal col-amber" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                    <path fill="currentColor" d="M576 0c17.7 0 32 14.3 32 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V32c0-17.7 14.3-32 32-32zM448 96c17.7 0 32 14.3 32 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V128c0-17.7 14.3-32 32-32zM352 224V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V224c0-17.7 14.3-32 32-32s32 14.3 32 32zM192 288c17.7 0 32 14.3 32 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V320c0-17.7 14.3-32 32-32zM96 416v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V416c0-17.7 14.3-32 32-32s32 14.3 32 32z"></path>
                                </svg>
                                {' Average Ping'}
                                <span className="float-end">Unavailable</span>
                            </p>
                            <p title={`Best Ping: ${player.info.best_ping}`}>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="signal" className="svg-icon svg-inline--fa fa-signal col-amber" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                    <path fill="currentColor" d="M576 0c17.7 0 32 14.3 32 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V32c0-17.7 14.3-32 32-32zM448 96c17.7 0 32 14.3 32 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V128c0-17.7 14.3-32 32-32zM352 224V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V224c0-17.7 14.3-32 32-32s32 14.3 32 32zM192 288c17.7 0 32 14.3 32 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V320c0-17.7 14.3-32 32-32zM96 416v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V416c0-17.7 14.3-32 32-32s32 14.3 32 32z"></path>
                                </svg>
                                {' Best Ping'}
                                <span className="float-end">Unavailable</span>
                            </p>
                            <p title={`Worst Ping: ${player.info.worst_ping}`}>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="signal" className="svg-icon svg-inline--fa fa-signal col-amber" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                    <path fill="currentColor" d="M576 0c17.7 0 32 14.3 32 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V32c0-17.7 14.3-32 32-32zM448 96c17.7 0 32 14.3 32 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V128c0-17.7 14.3-32 32-32zM352 224V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V224c0-17.7 14.3-32 32-32s32 14.3 32 32zM192 288c17.7 0 32 14.3 32 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V320c0-17.7 14.3-32 32-32zM96 416v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V416c0-17.7 14.3-32 32-32s32 14.3 32 32z"></path>
                                </svg>
                                {' Worst Ping'}
                                <span className="float-end">Unavailable</span>
                            </p>
                            <hr />
                            <p title={`Last Seen: ${player.info.last_seen}`}>
                                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar" className="svg-icon svg-inline--fa fa-calendar col-teal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3-28.7 64-64 64H64c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H64V24c0-13.3-10.7-24-24-24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192zM329 297L217 409c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47 95-95c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path>
                                </svg>
                                <b> Last Seen</b>
                                <span className="float-end">{player.info.last_seen}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerInfo;
