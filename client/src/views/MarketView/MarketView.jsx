import React, { useEffect, useMemo, useState } from 'react';
import '../PlayerView/PlayerView.css';     // Tái dùng style chung của PlayerView
import './MarketView.css';                 // Style riêng cho Market (nút Buy, v.v.)

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

const MarketView = () => {
  // ======= DATA (market list) =======
  const [players, setPlayers] = useState(() => {
    try { return JSON.parse(localStorage.getItem('marketPlayers') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('marketPlayers', JSON.stringify(players));
  }, [players]);

  // ======= BUDGET (đồng bộ với PlayerView) =======
  const [budget, setBudget] = useState(() => {
    try { return Number(localStorage.getItem('budget')) || 0; }
    catch { return 0; }
  });
  useEffect(() => {
    localStorage.setItem('budget', String(budget));
  }, [budget]);

  // ======= ADD FORM =======
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [nationality, setNationality] = useState('');
  const [position, setPosition] = useState('ST');
  const [number, setNumber] = useState('');
  const [condition, setCondition] = useState('100');
  const [marketValue, setMarketValue] = useState('');

  const openAddForm = () => {
    setName(''); setAge(''); setNationality('');
    setPosition('ST'); setNumber(''); setCondition('100'); setMarketValue('');
    setShowForm(true);
  };
  const closeForm = () => setShowForm(false);

  const handleAdd = (e) => {
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

    const newPlayer = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      name: trimmedName,
      age: ageNum,
      nationality: nationality.trim(),
      position,
      number: numberNum,
      condition: conditionNum,
      marketValue: mvNum,
    };
    setPlayers(prev => [newPlayer, ...prev]);
    closeForm();
  };

  // ======= BUY MODAL =======
  const [confirmBuy, setConfirmBuy] = useState({
    open: false, playerId: null, playerName: '', marketValue: 0
  });

  const openConfirmBuy = (p) => setConfirmBuy({
    open: true,
    playerId: p.id,
    playerName: p.name,
    marketValue: Number(p.marketValue) || 0,
  });

  const closeConfirmBuy = () => setConfirmBuy({
    open: false, playerId: null, playerName: '', marketValue: 0
  });



  const doBuy = () => {
    const cost = Number(confirmBuy.marketValue) || 0;
    if (cost > budget) {
      alert('Not enough budget to complete this transfer.');
      return;
    }

    // 1) Lấy cầu thủ từ list market hiện tại
    const bought = players.find(p => p.id === confirmBuy.playerId);
    if (!bought) { closeConfirmBuy(); return; }

    // 2) Thêm về đội hình PlayerView (chống trùng ID)
    const roster = readLS('players');
    if (!roster.some(x => x.id === bought.id)) {
      writeLS('players', [bought, ...roster]);
    }

    // 3) Trừ ngân quỹ & xóa khỏi market (KHÔNG side-effect trong updater)
    setBudget(prev => prev - cost);
    setPlayers(players.filter(p => p.id !== bought.id));

    // 4) Đóng modal
    closeConfirmBuy();
  };

  // ======= SEARCH (single input) =======
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
      <div className="players-section">{/* tái dùng layout chung */}
        <div className="players-header">
          <h2>Transfer Market</h2>
          <div className="budget-display">
            <strong>Club Budget:</strong> {budget.toLocaleString()} BP
          </div>
          <button className="btn-primary" onClick={openAddForm}>Add Player to Market</button>
        </div>

        {/* Search bar */}
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

        {/* Add form */}
        {showForm && (
          <div className="player-form-card">
            <div className="form-title">
              <span>Add Player</span>
              <button className="btn-ghost" onClick={closeForm} aria-label="Close form">✕</button>
            </div>

            <form className="player-form player-form--grid" onSubmit={handleAdd}>
              <div className="form-row">
                <label>Player Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Kylian Mbappé" />
              </div>
              <div className="form-row">
                <label>Age</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" />
              </div>
              <div className="form-row">
                <label>Nationality</label>
                <input value={nationality} onChange={(e) => setNationality(e.target.value)} placeholder="France" />
              </div>
              <div className="form-row">
                <label>Position</label>
                <select value={position} onChange={(e) => setPosition(e.target.value)}>
                  {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="form-row">
                <label>Shirt No.</label>
                <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="7" />
              </div>
              <div className="form-row">
                <label>Condition (%)</label>
                <input type="number" min="0" max="100" value={condition} onChange={(e) => setCondition(e.target.value)} />
              </div>
              <div className="form-row">
                <label>Market Value (BP)</label>
                <input type="number" value={marketValue} onChange={(e) => setMarketValue(e.target.value)} placeholder="1000000000" />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-ghost" onClick={closeForm}>Cancel</button>
                <button type="submit" className="btn-primary">Confirm</button>
              </div>
            </form>
          </div>
        )}

        {/* Table */}
        <div className="players-list">
          {shownPlayers.length === 0 ? (
            <p className="empty">No players match your search.</p>
          ) : (
            <table className="players-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Nationality</th>
                  <th>Pos</th>
                  <th>No.</th>
                  <th>Condition</th>
                  <th className="col-right">Market Value</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {shownPlayers.map((p, idx) => (
                  <tr key={p.id}>
                    <td className="col-center">{idx + 1}</td>
                    <td>{p.name}</td>
                    <td className="col-center">{p.age}</td>
                    <td>{p.nationality}</td>
                    <td className="col-center">{p.position}</td>
                    <td className="col-center">{p.number}</td>
                    <td className="col-center">{p.condition}%</td>
                    <td className="col-right">{formatBP(p.marketValue)}</td>
                    <td className="col-center">
                      <button className="btn-buy" onClick={() => openConfirmBuy(p)}>Buy</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Buy modal */}
      {confirmBuy.open && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <h3>Buy Player?</h3>
            <p>
              Are you sure you want to buy player <strong>{confirmBuy.playerName}</strong> for{' '}
              <strong>{formatBP(confirmBuy.marketValue)}</strong>?
            </p>
            <div className="modal-actions">
              <button className="btn-ghost" onClick={closeConfirmBuy}>Cancel</button>
              <button className="btn-buy" onClick={doBuy}>Confirm Buy</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MarketView;
