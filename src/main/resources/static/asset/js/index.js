(() => {
    const club_card_list = document.querySelector('.club-card-list');
    let club_state_item_active_element = document.querySelector('.start-club-state-item');
    let club_card_active_element = document.querySelector('#CEL').children[0];
    let club_card_index = 0;
    let club_card_max_index = 6;
    let club_drag = false;
    let club_drag_start_coordinate_x = 0;
    let club_drag_origin_translateX = 0;
    let club_drag_distance = 0;
    let index = 6;

    const sceneInfo = [
        {
            name: 'introduce',
            objs: {
                container: document.querySelector('.introduce'),
                introduce_cards: [
                    document.querySelector('.introduce-card-1'),
                    document.querySelector('.introduce-card-2'),
                    document.querySelector('.introduce-card-3'),
                    document.querySelector('.introduce-card-4'),
                ]
            },
            values: {
                active: false
            }
        },
        {
            name: 'club',
            objs: {
                container: document.querySelector('.club'),
                club_content: document.querySelector('.club-content')
            },
            values: {
                active: false
            }
        }
    ]

    const setClubCard = (club_state_item) => {
        const club_card = document.getElementById(club_state_item.dataset.id);
        const index = club_card.dataset.index;

        // club state item change active
        club_state_item_active_element.classList.remove('active');
        club_state_item_active_element = club_state_item;
        club_state_item_active_element.classList.add('active');

        // club card change active
        club_card_active_element.classList.remove('active');
        club_card_active_element = club_card.children[0];
        club_card_active_element.classList.add('active');

        club_card_index = index;
        club_card_list.style.transform = "translateX(-" + (index * club_card.clientWidth) + "px)";
    }

    const rotateClubCard = () => {
        if (!club_drag) {
            club_card_index++;
            club_card_index %= club_card_max_index;
            const club_state_item = document.querySelectorAll('.club-state-item')[club_card_index];
            setClubCard(club_state_item);
        }
    }

    const setLayout = () => {
        const scrollBottomHeight = innerHeight + scrollY;

        for (let i = 0; i < sceneInfo.length; i++) {
            if (!sceneInfo[i].values.active) {
                switch (sceneInfo[i].name) {
                    case 'introduce':
                        for (let j = 0; j < 4; j++) {
                            let introduce_card = sceneInfo[i].objs.introduce_cards[j];
                            let bounding_top = introduce_card.getBoundingClientRect().top;
                            if (bounding_top + pageYOffset < scrollBottomHeight && !introduce_card.classList.contains('active')) {
                                introduce_card.classList.add('active');

                                if (j === 3) {
                                    sceneInfo[i].values.active = true;
                                }
                            }
                        }
                        break;
                    case 'club':
                        let club_content = sceneInfo[i].objs.club_content;
                        let bounding_top = club_content.getBoundingClientRect().top;
                        if (bounding_top + pageYOffset < scrollBottomHeight && !club_content.classList.contains('active')) {
                            club_content.classList.add('active');

                            sceneInfo[i].values.active = true;
                        }
                    default:
                        break;
                }
            }
        }
    }

    const setClubDrag = (pageX) => {
        club_drag = true;
        club_drag_start_coordinate_x = pageX;
        club_drag_origin_translateX = club_card_list.style.transform.replace(/[^\d.]/g, '') * -1;
        club_drag_distance = 0;
        club_card_list.style.transition = '0s';
    }

    const moveClubDrag = (pageX) => {
        if (club_drag) {
            club_drag_distance = pageX - club_drag_start_coordinate_x;
            club_card_list.style.transform = "translateX(" + (club_drag_distance + club_drag_origin_translateX) + "px)";
        }
    }

    const doneClubDrag = () => {
        club_drag = false;
        club_card_list.style.transition = '.25s';

        // set card active
        let card_width = document.getElementById("CEL").clientWidth;
        let card_state_items = document.querySelectorAll('.club-state-item');
        let index = Math.floor(-(club_drag_origin_translateX + Math.floor(club_drag_distance / card_width) * card_width) / card_width);
        if (index < 0)
            index = 0;
        if (index > club_card_max_index - 1)
            index = 5;

        console.log("card_width: " + card_width);
        console.log("index: " + index);
        setClubCard(card_state_items[index]);
    }

    const inputReset = () => {
        document.querySelector('#author_input').value = "";
        document.querySelector('#club_input').value = "";
        document.querySelector('#content_input').value = "";
        document.querySelector('#id_input').value = "";
        document.querySelector('#phone_input').value = "";
    }

    // TODO LOAD
    window.addEventListener('load', () => {
        setLayout();
        setInterval(rotateClubCard, 6000);
    })

    // TODO scroll action
    window.addEventListener('scroll', (e) => {
        setLayout();
    })

    // TODO club card action
    document.querySelector('.club-state-list').addEventListener('click', (e) => {
        if (!e.target.classList.contains('club-state-list')) {
            club_card_index = e.target.dataset.index;
            setClubCard(e.target);
        }
    })

    // TODO club card drag
    document.querySelector('.club-card-list').addEventListener('mousedown', (e) => {
        setClubDrag(e.pageX)
    })
    document.querySelector('.club-card-list').addEventListener('mousemove', (e) => {
        moveClubDrag(e.pageX);
    })
    document.querySelector('.club-card-list').addEventListener('mouseup', () => {
        doneClubDrag();
    })

    document.querySelector('.club-card-list').addEventListener('mouseleave', () => {
        // 약간 에러있음
        // console.log('leave');
        // doneClubDrag();
    })

    // TODO scroll move to event
    document.querySelector('.event-move-btn').addEventListener('click', () => {
        document.querySelector('.comment').scrollIntoView({behavior: 'smooth', block: 'center'});
    })

    // TODO get celebration
    document.querySelector('.celebration-more-btn').addEventListener('click', () => {
        $.ajax({
            cache: false,
            url: "/get_celebration", // 요기에
            type: 'POST',
            data: {
                index: index
            },
            success: function (data) {
                // success
                console.log('success');

                let celebration_card_list = ``;
                for (let i = 0; i < data.length; i++) {
                    let celebration_info = data[i];
                    let celebration_card = `
                       <div class="col-lg-4 col-sm-6 col-12">
                            <div class="card celebration-card">
                                <div class="card-name">${celebration_info.author}</div>
                                <div class="card-sub">${celebration_info.id} / ${celebration_info.club}</div>
                                <span class="card-description">
                                    ${celebration_info.content}"
                                </span>
                            </div> 
                        </div>
                    `;

                    celebration_card_list += celebration_card;
                }

                document.querySelector('.celebration-card-list').insertAdjacentHTML('beforeend', celebration_card_list);
                index += 6;
            },
            error: function (data) {
                // error
                alert('실패했습니다.');
            }
        }); // $.ajax */
    })

    // TODO comment
    document.querySelector('.comment-form').addEventListener('submit', (e) => {
        e.preventDefault();

        let formData = $(".comment-form").serialize();

        let author = document.querySelector('#author_input').value;
        let club = document.querySelector('#club_input').value;
        let content = document.querySelector('#content_input').value;
        let id = document.querySelector('#id_input').value;

        let form_btn = document.querySelector('.form-btn');
        form_btn.disabled = true;
        form_btn.innerHTML = `<span> 전송중.. </span>`;

        $.ajax({
            cache: false,
            url: "/submit_celebrate", // 요기에
            type: 'POST',
            data: formData,
            success: function (data) {
                if (data === "bug") {
                    // bug
                    alert("왜 그러시나요...");
                } else {
                    //success
                    let html = `
                    <div class="col-lg-4 col-sm-6 col-12">
                        <div class="card celebration-card current">
                            <div class="card-name">${author}</div>
                            <div class="card-sub">${id} / ${club}</div>
                            <span class="card-description">
                                ${content}
                            </span>
                        </div>
                    </div>
                    `;

                    // document.querySelector('.celebration-card-list').innerHTML = html;
                    document.querySelector('.celebration-card-list').insertAdjacentHTML('beforeend', html);
                    document.querySelector('.card.current').scrollIntoView({behavior: 'smooth', block: 'center'});
                }
            },
            error: function (data) {
                // error
                alert('실패했습니다.');
            },
            complete: function () {
                inputReset();
                document.querySelector('.form-btn').disabled = false;
                form_btn.innerHTML = `<span>글쓰기</span>`;
            }
        }); // $.ajax */
    })

    // TODO Move link
    document.querySelector('.introduce-card-list').addEventListener('click', (e) => {
        let parent = e.target;
        let isTure = true;

        // search introduce-card
        while (true) {
            if (parent.classList.contains("introduce-card-list")) {
                isTure = false;
                break;
            } else if(parent.classList.contains('introduce-card')) {
                isTure = true;
                break;
            }
            else {
                parent = parent.parentNode;
            }

        }

        if (isTure) {
            switch (parent.dataset.id) {
                case "introduce":
                    window.open("https://www.youtube.com/watch?v=dIYudZLkocE");
                    break;
                case "celebration":
                    window.open("https://youtu.be/YvP2z9mnnW4");
                    break;
                case "lecture":
                    location.href="/lecture";
                    break;
                case "award":
                    window.open("https://youtube.com/watch?v=FWNxkk0ksi4&feature=youtu.be");
                    break;
            }
        }
    })
})()