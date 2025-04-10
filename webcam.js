// Webcam functionality
document.addEventListener('DOMContentLoaded', function() {
    const cameraFeed = document.getElementById('camera-feed');
    const cameraPlaceholder = document.querySelector('.camera-placeholder');
    let stream = null;

    // Function to start the camera
    async function startCamera() {
        try {
            console.log('Requesting camera access...');
            
            // Request camera access
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'user'
                }
            });
            
            console.log('Camera access granted:', stream);

            // Create video element
            const video = document.createElement('video');
            video.id = 'webcam-video';
            video.autoplay = true;
            video.playsInline = true;
            video.muted = true;
            video.srcObject = stream;
            
            // Set explicit dimensions
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';
            video.style.borderRadius = '12px';
            video.style.display = 'block'; // Ensure it's displayed as block

            // Hide placeholder and show video
            if (cameraPlaceholder) {
                cameraPlaceholder.style.display = 'none';
            }
            
            // Clear any existing video elements
            const existingVideo = document.getElementById('webcam-video');
            if (existingVideo) {
                existingVideo.remove();
            }
            
            // Append the video element
            cameraFeed.appendChild(video);
            
            // Force play the video
            try {
                await video.play();
                console.log('Video playback started');
            } catch (playError) {
                console.error('Error playing video:', playError);
                showError('Error playing video. Please try again.');
            }

            // Add error handling
            video.onerror = function(error) {
                console.error('Video element error:', error);
                showError('Unable to access camera. Please check your camera permissions.');
            };

        } catch (error) {
            console.error('Error accessing camera:', error);
            showError('Camera access denied. Please allow camera access to use this feature.');
        }
    }

    // Function to stop the camera
    function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
            console.log('Camera stopped');
        }
    }

    // Function to show error messages
    function showError(message) {
        console.error('Camera error:', message);
        
        // Remove any existing error messages
        const existingError = document.querySelector('.camera-error');
        if (existingError) {
            existingError.remove();
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'camera-error';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        `;
        cameraFeed.appendChild(errorDiv);
    }

    // Add camera controls
    const controls = document.createElement('div');
    controls.className = 'camera-controls';
    controls.innerHTML = `
        <button id="start-camera" class="control-btn">
            <i class="fas fa-camera"></i>
        </button>
        <button id="stop-camera" class="control-btn" style="display: none;">
            <i class="fas fa-stop"></i>
        </button>
    `;
    cameraFeed.appendChild(controls);

    // Add event listeners for controls
    document.getElementById('start-camera').addEventListener('click', function() {
        console.log('Start camera button clicked');
        startCamera();
        this.style.display = 'none';
        document.getElementById('stop-camera').style.display = 'block';
    });

    document.getElementById('stop-camera').addEventListener('click', function() {
        console.log('Stop camera button clicked');
        stopCamera();
        this.style.display = 'none';
        document.getElementById('start-camera').style.display = 'block';
        if (cameraPlaceholder) {
            cameraPlaceholder.style.display = 'block';
        }
        const video = document.getElementById('webcam-video');
        if (video) {
            video.remove();
        }
    });

    // Add CSS for new elements
    const style = document.createElement('style');
    style.textContent = `
        .camera-error {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 107, 107, 0.9);
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
            color: white;
            z-index: 10;
        }

        .camera-error i {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }

        .camera-controls {
            position: absolute;
            bottom: 1rem;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 1rem;
            z-index: 10;
        }

        #webcam-video {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 12px;
            display: block;
            background-color: #000;
        }
        
        .camera-feed {
            position: relative;
            width: 100%;
            height: 500px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 12px;
            overflow: hidden;
            margin-bottom: 1.5rem;
        }
        
        .interactive-interface {
            max-width: 800px;
            margin: 0 auto;
        }
    `;
    document.head.appendChild(style);
    
    // Log that the script has loaded
    console.log('Webcam.js loaded successfully');
}); 