import { 
    IconPlayerPlayFilled,
    IconPlayerPauseFilled,
    IconPlayerSkipForwardFilled,
    IconPlayerSkipBackFilled,
} from '@tabler/icons-react';

import './PlayerControls.css'

function PlayerControls({ togglePause, setToNextVideo, setToPreviousVideo, isPaused }) {
    return (
		<>
			<div id="player-controls" className="player-controls player-controls--yt">
				<button className="player-controls__button" onClick={ setToPreviousVideo }>
					<IconPlayerSkipBackFilled />
				</button>
				<button className="player-controls__button" onClick={ togglePause }>
					{ !isPaused ? <IconPlayerPauseFilled /> : <IconPlayerPlayFilled /> }
				</button>
				<button className="player-controls__button" onClick={ setToNextVideo }>
                    <IconPlayerSkipForwardFilled />
				</button>
			</div>
		</>
	)
}

export default PlayerControls;