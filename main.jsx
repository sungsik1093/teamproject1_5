import React, { useState, useEffect } from 'react';

const ClubCategories = () => {
    const [category, setCategory] = useState('all'); //....... 현재 선택된 카테고리
    const [clubs, setClubs] = useState([]);          // 선택된 카테고리에 속한 동아리들

    // 카테고리가 변경될 때마다 해당 카테고리의 동아리 데이터를 가져옴
    useEffect(() => {
        fetch(`/api/clubs?category=${category}`)
            .then(response => response.json())
            .then(data => setClubs(data))
            .catch(error => console.error('Error fetching clubs:', error));
    }, [category]); // 카테고리가 변경될 때마다 호출

    // UI에 카테고리 버튼과 동아리 목록을 표시
    return (
        <div>
            <nav>
                <button onClick={() => setCategory('all')}>전체</button>
                <button onClick={() => setCategory('academic')}>학술</button>
                <button onClick={() => setCategory('performance')}>공연</button>
                <button onClick={() => setCategory('volunteer')}>봉사</button>
                <button onClick={() => setCategory('sports')}>운동</button>
                <button onClick={() => setCategory('hobby')}>취미</button>
                <button onClick={() => setCategory('religion')}>종교</button>
                <button onClick={() => setCategory('etc')}>기타</button>
            </nav>
            
            <div className="clubs">
                {clubs.map((club, index) => (
                    <div key={index} className="club">
                        <h3>{club.name}</h3>
                        <p>{club.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClubCategories;
