const model = (() => {
    const episodes = [
        {
            title: "Ginny",
            desc: "Harry tries to talk about the quidditch toys he's building for his future child while Aquila fights to keep him on topic.",
            link: "https://www.youtube.com/embed/Mz2YrzyT_iU",
            bonusContent: [
                {
                    bonusDesc: "Placeholder text describing the following image.",
                    type: "vid",
                    link: "https://www.youtube.com/embed/Mz2YrzyT_iU",
                },
                {
                    bonusDesc: "This is more placeholder text for the next part",
                    type: "img",
                    link: "../images/leo.jpg",
                }
            ]
        },
        {
            title: "Molly",
            desc: "Molly didn't knit Harry a sweater for Christmas!  Aquila tries to help Harry figure out why.",
            link: "",
            bonusContent: [
                "",

            ]
        },
        {
            title: "Hogwarts",
            desc: "Harry and Ron investigated a crime at Hogwarts, but tensions flared when the visit went south.  Aquila helps Harry put things in perspective.",
            link: "",
            bonusContent: [
                "",

            ]
        },
        {
            title: "Ministry",
            desc: "Harry's in trouble at work thanks to a risky plan to snare a crime boss and he takes it out on Aquila.  Can she keep her cool?",
            link: "",
            bonusContent: [
                "",

            ]
        },
        {
            title: "Harry",
            desc: "Aquila isn't sure if Harry will ever come back after their nasty fight.",
            link: "",
            bonusContent: [
                "",

            ]
        },
        {
            title: "Dumbledore",
            desc: "Aquila finally lets Harry use the pensieve!  Together, they revisit an upsetting encounter with Dumbledore's portrait.",
            link: "",
            bonusContent: [
                "",

            ]
        },
        {
            title: "James Sirius",
            desc: "Harry Potter is a father!  His new baby forces him to explore his complicated feelings about Sirius Black—plus, Harry finally discovers the identity of the infamous crime boss known as The Jonquil.",
            link: "",
            bonusContent: [
                "",

            ]
        },
    ]
    return {episodes};
})();

const view = (() => {
    const content = document.querySelector(".content");

    const createEpisodeSection = (epNum) => {
        const episodeSection = document.createElement("section");
        const episodeNumberLabel = document.createElement("h3");
        episodeNumberLabel.textContent = `- Episode ${epNum} -`;
        const episodeTitle = document.createElement("h1");
        episodeTitle.textContent = `"${model.episodes[epNum - 1].title}"`;
        const episodeDesc = document.createElement("p");
        episodeDesc.classList.add("episode-desc");
        episodeDesc.textContent = model.episodes[epNum - 1].desc;
        const episodeVideo = document.createElement("iframe");
        episodeVideo.src = model.episodes[epNum - 1].link;
        episodeVideo.frameBorder = 0;

        episodeSection.append(
                episodeNumberLabel,
                episodeTitle,
                episodeDesc,
                episodeVideo,
                createBonusContentElements(epNum - 1),
            );
        return episodeSection;
    }
    const createBonusContentElements = (epIndex) => {
        const fragment = document.createDocumentFragment();
        const bonusSectionLabel = document.createElement("h2");
        bonusSectionLabel.textContent = "Bonus Content";
        bonusSectionLabel.classList.add("bonus-section-label");
        fragment.append(bonusSectionLabel);

        model.episodes[epIndex].bonusContent.forEach(bonus => {
            const bonusDesc = document.createElement("p");
            bonusDesc.classList.add("bonus-desc");
            bonusDesc.textContent = bonus.bonusDesc;
            let bonusItem = "";
            switch (bonus.type) {
                case "vid":
                    bonusItem = document.createElement("iframe");
                    bonusItem.frameBorder = 0;
                    bonusItem.src = bonus.link;
                    break;
                case "img":
                    bonusItem = document.createElement("img");
                    bonusItem.classList.add("bonus-img");
                    bonusItem.src = bonus.link;
                    // bonusItem.style.backgroundImage = `url("${bonus.link}")`;
                    console.log("it does get here");
                    break;
            }
            bonusItem.classList.add("bonus-item");
            fragment.append(bonusDesc, bonusItem);
        });
        return fragment;
    }
    const clearContent = () => {
        if (content) {
            const contentContainer = document.createRange();
            contentContainer.selectNodeContents(content);
            contentContainer.deleteContents();
        }
    }

    const setup = (() => {
        const episodeGrid = document.querySelector(".episode-grid");
    
        const createEpisodeTab = (num) => {
            const tab = document.createElement("div");
            tab.classList.add("ep-tab");
            if (num === 1) {
                tab.classList.add("ep-tab-active");
            }
            tab.dataset.tab = num;
            tab.textContent = num;
            return tab;
        }
        const createEpisodeGrid = (() => {
            for (let i = 1; i <= 7; i++) {
                episodeGrid.append(createEpisodeTab(i));
            }
        })();
        
        content.append(createEpisodeSection(1));
    })();

    const epTabs = document.querySelectorAll(".ep-tab");
    epTabs.forEach(tab => tab.addEventListener("click", (e) => {
        switchEpisodeTab(e);
    }));
    const switchEpisodeTab = (e) => {
        epTabs.forEach(tab => tab.classList.remove("ep-tab-active"));
        e.target.classList.add("ep-tab-active");
        clearContent();
        content.append(createEpisodeSection(e.target.dataset.tab));
    }

    return {createEpisodeSection};
})();