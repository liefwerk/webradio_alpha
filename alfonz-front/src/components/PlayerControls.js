import { 
    IconPlayerPlay,
    IconPlayerPause,
    IconPlayerSkipForward,
    IconPlayerSkipForwardFilled,
    IconPlayerSkipBack,
    IconPlayerSkipBackFilled,
 } from '@tabler/icons-react';


function PlayerControls({ togglePause, setToNextVideo, setToPreviousVideo, isPaused }) {
    return (
		<>
			<div id="player-controls player-controls--yt">
				<button onClick={ togglePause }>
					{ !isPaused ? <IconPlayerPause /> : <IconPlayerPlay /> }
				</button>
				<button onClick={ setToPreviousVideo }>
					<IconPlayerSkipBack />
				</button>
				<button onClick={ setToNextVideo }>
                    <IconPlayerSkipForward />
				</button>
			</div>
		</>
	)
}

export default PlayerControls;