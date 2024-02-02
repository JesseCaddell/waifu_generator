document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('waifuGallery');
    const nextButton = document.getElementById('nextButton');

    const fetchWaifu = () => {
        fetch('/waifus')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network resonse was not okay');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); //debug log to see structure
                
                // Clear existing content in gallery
                gallery.innerHTML = '';

                const waifu = data.images && data.images.length > 0 ? data.images[0] : null;
                
                if (waifu.artist != null) {
                    
                    // create elements for the image name and artist
                    const img = document.createElement('img');
                    img.src = waifu.url;
                    img.alt = waifu.artist ? waifu.artist.name : 'Unknown'; // Check if artist is null
                    img.className = 'waifu-image';

                    const name = document.createElement('p');
                    name.textContent = `Artist: ${waifu.artist.name ? waifu.artist.name :'Unknown'}`;


                    const artist = document.createElement('p');
                    artist.textContent = `Artist Socials: ${waifu.artist.twitter ? waifu.artist.twitter : 'Unknown'}`;

                    // Append elements to gallery
                    gallery.appendChild(img);
                    gallery.appendChild(name);
                    gallery.appendChild(artist);
                
                } else {
                    // Handle null waifu
                    console.log('Waifu is null, skiping...')
                    const img = document.createElement('img');
                    img.src = '/images/anime_question.png';
                    img.alt = 'Oops, waifu not found... search again!';
                    img.className = 'waifu-image';

                    const message = document.createElement('p');
                    message.textContent = 'Oops, waifu not found... search again!';

                    // Append elements
                    gallery.appendChild(img);
                    gallery.appendChild(message);
                }

            })
            .catch(error => console.error('Error fetching waifus:', error))

        };

        // Fetch and display initial waifu
        fetchWaifu();

        // event listener for next button
        nextButton.addEventListener('click', () => {
            fetchWaifu();
        });
    
});