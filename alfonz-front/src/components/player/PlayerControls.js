import { 
    IconPlayerPlayFilled,
    IconPlayerPauseFilled,
    IconPlayerSkipForwardFilled,
    IconPlayerSkipBackFilled,
    IconLoader2,
} from '@tabler/icons-react';

import './PlayerControls.css'

function PlayerControls({ togglePause, setToNextVideo, setToPreviousVideo, isPaused, isCuingTrack }) {
    return (
		<>
			<div id="player-controls" className="player-controls player-controls--yt">
				<button className="player-controls__button" onClick={ setToPreviousVideo }>
					<IconPlayerSkipBackFilled />
				</button>
				<button className="player-controls__button player-controls__button--center" onClick={ togglePause } disabled={ isCuingTrack }>
					{ isCuingTrack ? (
						<IconLoader2 className="player-controls__spinner" />
					) : (
						!isPaused ? <IconPlayerPauseFilled /> : <IconPlayerPlayFilled />
					) }
				</button>
				<button className="player-controls__button" onClick={ setToNextVideo }>
                    <IconPlayerSkipForwardFilled />
				</button>
			</div>
		</>
	)
}

export default PlayerControls;