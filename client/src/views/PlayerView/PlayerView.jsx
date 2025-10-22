import React, { useEffect, useMemo, useState } from 'react';
import './PlayerView.css';

const POSITIONS = ['GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'CAM', 'LM', 'RM', 'LW', 'RW', 'ST'];

function formatBP(n) {
  if (n === '' || n === null || Number.isNaN(n)) return '0 BP';
  const val = Number(n);
  return `${val.toLocaleString('en-US')} BP`;
}

const readLS = (key) => {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); }
  catch { return []; }
};
const writeLS = (key, arr) => localStorage.setItem(key, JSON.stringify(arr));

const PlayerView = () => {
  // ======= DATA =======
  const [players, setPlayers] = useState(() => {
    try { return JSON.parse(localStorage.getItem('players') || '[]'); }
    catch { return []; }
  });

  // Budget (persist)
  const [budget, setBudget] = useState(() => {
    try { return Number(localStorage.getItem('budget')) || 999999999; }
    catch { return 0; }
  });

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('budget', String(budget));
  }, [budget]);

  // ======= ADD/UPDATE FORM =======
  const [showForm, setShowForm] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [nationality, setNationality] = useState('');
  const [position, setPosition] = useState('ST');
  const [number, setNumber] = useState('');
  const [condition, setCondition] = useState('100');
  const [marketValue, setMarketValue] = useState('');

  const openAddForm = () => {
    setEditingPlayer(null);
    setName(''); setAge(''); setNationality('');
    setPosition('ST'); setNumber(''); setCondition('100'); setMarketValue('');
    setShowForm(true);
  };

  const openUpdateForm = (player) => {
    setEditingPlayer(player);
    setName(player.name);
    setAge(String(player.age));
    setNationality(player.nationality);
    setPosition(player.position);
    setNumber(String(player.number));
    setCondition(String(player.condition));
    setMarketValue(String(player.marketValue));
    setShowForm(true);
  };

  const closeForm = () => { setShowForm(false); setEditingPlayer(null); };

  const handleSave = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const ageNum = Number(age);
    const numberNum = Number(number);
    const conditionNum = Number(condition);
    const mvNum = Number(marketValue);

    if (!trimmedName) return alert('Please enter player name');
    if (!Number.isInteger(ageNum) || ageNum <= 0) return alert('Age must be positive');
    if (!nationality.trim()) return alert('Please enter nationality');
    if (!POSITIONS.includes(position)) return alert('Position invalid');
    if (!Number.isInteger(numberNum) || numberNum <= 0 || numberNum > 99) return alert('Shirt number must be 1–99');
    if (!Number.isFinite(conditionNum) || conditionNum < 0 || conditionNum > 100) return alert('Condition 0–100');
    if (!Number.isFinite(mvNum) || mvNum < 0) return alert('Market value must be ≥ 0');

    const newData = {
      id: editingPlayer ? editingPlayer.id : (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString()),
      name: trimmedName,
      age: ageNum,
      nationality: nationality.trim(),
      position,
      number: numberNum,
      condition: conditionNum,
      marketValue: mvNum,
    };

    if (editingPlayer) {
      setPlayers(prev => prev.map(p => (p.id === editingPlayer.id ? newData : p)));
    } else {
      setPlayers(prev => [newData, ...prev]);
    }
    closeForm();
  };

  // ======= SELL MODAL (always an object, never null) =======
  const [confirmSell, setConfirmSell] = useState({
    open: false, playerId: null, playerName: '', marketValue: 0
  });



  const openConfirmSell = (p) => setConfirmSell({
    open: true,
    playerId: p.id,
    playerName: p.name,
    marketValue: Number(p.marketValue) || 0,
  });

  const closeConfirmSell = () => setConfirmSell({
    open: false,
    playerId: null,
    playerName: '',
    marketValue: 0,
  });

  const doSell = () => {
    // 1) Lấy cầu thủ từ state hiện tại
    const sold = players.find(p => p.id === confirmSell.playerId);
    if (!sold) { closeConfirmSell(); return; }

    // 2) Đẩy sang Market (chống trùng ID)
    const market = readLS('marketPlayers');
    if (!market.some(x => x.id === sold.id)) {
      writeLS('marketPlayers', [sold, ...market]);
    }

    // 3) Cập nhật đội hình và ngân quỹ (KHÔNG side-effect trong updater)
    setPlayers(players.filter(p => p.id !== sold.id));
    setBudget(prev => prev + (Number(sold.marketValue) || 0));

    // 4) Đóng modal
    closeConfirmSell();
  };

  // ======= DETAIL MODAL (card click) =======
  const [detail, setDetail] = useState({ open: false, player: null });

  const openDetail = (p) => setDetail({ open: true, player: p });
  const closeDetail = () => setDetail({ open: false, player: null });





  // ======= SIMPLE SEARCH (name, nationality, position, number) =======
  const [q, setQ] = useState('');
  const shownPlayers = useMemo(() => {
    const kw = q.trim().toLowerCase();
    return [...players].filter(p => {
      if (!kw) return true;
      const haystack = `${p.name} ${p.nationality} ${p.position} ${p.number}`.toLowerCase();
      return haystack.includes(kw);
    });
  }, [players, q]);

  // ======= RENDER =======
  return (
    <>
      <div className="players-section">
        <div className="players-header">
          <h2>Players Management</h2>
          <div className="budget-display">
            <strong>Club Budget:</strong> {budget.toLocaleString()} BP
          </div>
          {/* <button className="btn-primary" onClick={openAddForm}>Add New Player</button> */}
        </div>

        {/* 🔍 Search bar (single) */}
        <div className="search-card">
          <div className="search-row single">
            <input
              className="inp search-single"
              placeholder="Search by name, nationality, position, or shirt number..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        {/* Add / Update form */}
        {showForm && (
          <div className="player-form-card">
            <div className="form-title">
              <span>{editingPlayer ? 'Update Player' : 'Add Player'}</span>
              <button className="btn-ghost" onClick={closeForm} aria-label="Close form">✕</button>
            </div>

            <form className="player-form player-form--grid" onSubmit={handleSave}>
              <div className="form-row">
                <label>Player Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Lionel Messi" />
              </div>
              <div className="form-row">
                <label>Age</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="36" />
              </div>
              <div className="form-row">
                <label>Nationality</label>
                <input value={nationality} onChange={(e) => setNationality(e.target.value)} placeholder="Argentina" />
              </div>
              <div className="form-row">
                <label>Position</label>
                <select value={position} onChange={(e) => setPosition(e.target.value)}>
                  {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="form-row">
                <label>Shirt No.</label>
                <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="10" />
              </div>
              <div className="form-row">
                <label>Condition (%)</label>
                <input type="number" min="0" max="100" value={condition} onChange={(e) => setCondition(e.target.value)} />
              </div>
              <div className="form-row">
                <label>Market Value (BP)</label>
                <input type="number" value={marketValue} onChange={(e) => setMarketValue(e.target.value)} placeholder="500000000" />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-ghost" onClick={closeForm}>Cancel</button>
                <button type="submit" className="btn-primary">{editingPlayer ? 'Update' : 'Confirm'}</button>
              </div>
            </form>
          </div>
        )}

        {/* Cards */}
        <div className="players-list">
          {shownPlayers.length === 0 ? (
            <p className="empty">No players match your search.</p>
          ) : (
            <div className="cards-grid">
              {shownPlayers.map((p) => (
                <div
                  key={p.id}
                  className="player-card"
                  onClick={() => openDetail(p)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' ? openDetail(p) : null)}
                >
                  {/* ========== THÔNG TIN TRÊN THẺ ========== */}
                  <div className="player-card__info">
                    <div className="player-card__name">{p.name}</div>
                    <div className="player-card__meta">
                      <span className="player-card__pos">{p.position}</span>
                      <span className="player-card__no">#{p.number}</span>
                    </div>
                  </div>

                  <div className="player-card__actions">
                    <button
                      className="btn-update"
                      onClick={(e) => { e.stopPropagation(); openUpdateForm(p); }}
                    >
                      Update
                    </button>
                    <button
                      className="btn-sell"
                      onClick={(e) => { e.stopPropagation(); openConfirmSell(p); }}
                    >
                      Sell
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Sell modal */}
      {confirmSell.open && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <h3>Sell Player?</h3>
            <p>
              Are you sure you want to sell player <strong>{confirmSell.playerName}</strong>?
            </p>
            <div className="modal-actions">
              <button className="btn-ghost" onClick={closeConfirmSell}>Cancel</button>
              <button className="btn-sell" onClick={doSell}>Confirm Sale</button>
            </div>
          </div>
        </div>
      )}

      {/* Detail modal (opened by clicking a card) */}
      {
        detail.open && detail.player && (
          <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="modal modal-detail">
              <h3>{detail.player.name}</h3>

              <ul className="detail-list">
                <li><span>Age</span><strong>{detail.player.age}</strong></li>
                <li><span>Nationality</span><strong>{detail.player.nationality}</strong></li>
                <li><span>Position</span><strong>{detail.player.position}</strong></li>
                <li><span>Shirt No.</span><strong>{detail.player.number}</strong></li>
                <li><span>Condition</span><strong>{detail.player.condition}%</strong></li>
                <li><span>Market Value</span><strong>{formatBP(detail.player.marketValue)}</strong></li>
              </ul>

              <div className="modal-actions">
                <button className="btn-ghost" onClick={closeDetail}>Close</button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default PlayerView;
