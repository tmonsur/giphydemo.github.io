$(document).ready(function() {
    const $gifArea = $("#search-res");
    const $searchInput = $("#search");
    const apiKey = 'tkgRbpRq0Zz2tManQmpSXmw5yESky7kf';

    // Function to add a GIF to the page
    function addGif(data) {
        const numResults = data.length;
        if (numResults) {
            const randomIdx = Math.floor(Math.random() * numResults);
            const gifUrl = data[randomIdx].images.original.url;
            const $newGif = $("<img>", {
                src: gifUrl,
                class: "w-100" // Full width
            });
            const $newCol = $("<div>", {
                class: "col-md-4 col-12 mb-4"
            }).append($newGif);
            $gifArea.append($newCol);
        }
    }

    // Handle form submission: clear search box & make AJAX call
    $("form").on("submit", async function(evt) {
        evt.preventDefault();
        const searchTerm = $searchInput.val().trim();
        $searchInput.val(""); // Clear the search input

        if (searchTerm) {
            try {
                const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
                    params: {
                        q: searchTerm,
                        api_key: apiKey
                    }
                });
                addGif(response.data.data);
            } catch (error) {
                console.error('Error fetching GIFs:', error);
            }
        }
    });

    // Remove all GIFs
    $("#remove").on("click", function() {
        $gifArea.empty();
    });
});
