import React, { useState, useEffect } from 'react';
import { Heart, Lock, Gift, Sparkles, Star, Share2, Copy, Check } from 'lucide-react';

const LoveMessageCalendar = () => {
  const [openedDays, setOpenedDays] = useState({});
  const [currentDay, setCurrentDay] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Pacifico&family=Dancing+Script:wght@400;700&family=Satisfy&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const today = new Date();
    if (today.getMonth() === 11) {
      setCurrentDay(today.getDate());
    }
    
    // Load opened days from storage
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const result = await window.storage.get('opened-days');
      if (result) {
        setOpenedDays(JSON.parse(result.value));
      }
    } catch (error) {
      console.log('No saved progress yet');
    }
  };

  const saveProgress = async (newOpenedDays) => {
    try {
      await window.storage.set('opened-days', JSON.stringify(newOpenedDays));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const loveMessages = [
    { day: 1, message: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. - 1 Corinthians 13:4", prayer: "Pray for patience and kindness in your relationship", emoji: "🎅" },
    { day: 2, message: "Two are better than one, because they have a good return for their labor. - Ecclesiastes 4:9", prayer: "Thank God for your partnership and teamwork", emoji: "⛄" },
    { day: 3, message: "Above all, love each other deeply, because love covers over a multitude of sins. - 1 Peter 4:8", prayer: "Pray for forgiveness and grace in your relationship", emoji: "🎄" },
    { day: 4, message: "Let all that you do be done in love. - 1 Corinthians 16:14", prayer: "Ask God to guide your actions with love today", emoji: "❄️" },
    { day: 5, message: "Be completely humble and gentle; be patient, bearing with one another in love. - Ephesians 4:2", prayer: "Pray for humility and gentleness toward each other", emoji: "⭐" },
    { day: 6, message: "Love never fails. - 1 Corinthians 13:8", prayer: "Trust in God's unfailing love for your relationship", emoji: "🎁" },
    { day: 7, message: "A cord of three strands is not quickly broken. - Ecclesiastes 4:12", prayer: "Pray that God remains at the center of your relationship", emoji: "🔔" },
    { day: 8, message: "Be devoted to one another in love. Honor one another above yourselves. - Romans 12:10", prayer: "Pray for selflessness and devotion to each other", emoji: "🕯️" },
    { day: 9, message: "Love one another as I have loved you. - John 13:34", prayer: "Ask God to help you love as Jesus loves", emoji: "☃️" },
    { day: 10, message: "There is no fear in love. But perfect love drives out fear. - 1 John 4:18", prayer: "Pray for courage and peace in your relationship", emoji: "🎄" },
    { day: 11, message: "May the Lord make your love increase and overflow for each other. - 1 Thessalonians 3:12", prayer: "Pray for your love to grow abundantly", emoji: "🎅" },
    { day: 12, message: "Love does not delight in evil but rejoices with the truth. - 1 Corinthians 13:6", prayer: "Pray for honesty and integrity in your relationship", emoji: "⛄" },
    { day: 13, message: "I have found the one whom my soul loves. - Song of Solomon 3:4", prayer: "Thank God for bringing you together", emoji: "❄️" },
    { day: 14, message: "Love is strong as death, its jealousy unyielding as the grave. - Song of Solomon 8:6", prayer: "Pray for commitment and faithfulness", emoji: "⭐" },
    { day: 15, message: "The Lord your God is with you, he is mighty to save. He will rejoice over you with singing. - Zephaniah 3:17", prayer: "Pray for God's presence in your long-distance journey", emoji: "🎁" },
    { day: 16, message: "Do everything in love. - 1 Corinthians 16:14", prayer: "Pray that love guides all your decisions today", emoji: "🔔" },
    { day: 17, message: "Love bears all things, believes all things, hopes all things, endures all things. - 1 Corinthians 13:7", prayer: "Pray for endurance through the distance and challenges", emoji: "🕯️" },
    { day: 18, message: "Many waters cannot quench love; rivers cannot sweep it away. - Song of Solomon 8:7", prayer: "Pray that your love remains strong despite the miles", emoji: "☃️" },
    { day: 19, message: "Submit to one another out of reverence for Christ. - Ephesians 5:21", prayer: "Pray for mutual respect and submission", emoji: "🎄" },
    { day: 20, message: "Place me like a seal over your heart, like a seal on your arm. - Song of Solomon 8:6", prayer: "Pray for deep connection despite the distance", emoji: "🎅" },
    { day: 21, message: "Be kind and compassionate to one another, forgiving each other. - Ephesians 4:32", prayer: "Pray for kindness and quick forgiveness", emoji: "⛄" },
    { day: 22, message: "I am my beloved's and my beloved is mine. - Song of Solomon 6:3", prayer: "Thank God for your commitment to each other", emoji: "❄️" },
    { day: 23, message: "May the God of hope fill you with all joy and peace. - Romans 15:13", prayer: "Pray for joy and peace during this Christmas season", emoji: "⭐" },
    { day: 24, message: "For God so loved the world that he gave his one and only Son. - John 3:16", prayer: "Reflect on God's greatest gift of love this Christmas Eve", emoji: "🎁" },
    { day: 25, message: "Today in the town of David a Savior has been born to you; he is the Messiah, the Lord. - Luke 2:11", prayer: "Celebrate Jesus' birth and His love for you both", emoji: "🎄" },
    { day: 26, message: "Trust in the Lord with all your heart and lean not on your own understanding. - Proverbs 3:5", prayer: "Pray for trust in God's plan for your future together", emoji: "🔔" },
    { day: 27, message: "Love and faithfulness meet together; righteousness and peace kiss each other. - Psalm 85:10", prayer: "Pray for faithfulness until you're together again", emoji: "🕯️" },
    { day: 28, message: "The Lord bless you and keep you; the Lord make his face shine on you. - Numbers 6:24-25", prayer: "Pray for God's blessing over your relationship", emoji: "☃️" },
    { day: 29, message: "He who began a good work in you will carry it on to completion. - Philippians 1:6", prayer: "Trust God to complete the work He's doing in your relationship", emoji: "⭐" },
    { day: 30, message: "Give thanks to the Lord, for he is good; his love endures forever. - Psalm 107:1", prayer: "Thank God for His faithfulness this year", emoji: "🎁" },
    { day: 31, message: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future. - Jeremiah 29:11", prayer: "Pray with hope for your future together in the new year", emoji: "🎆" }
  ];

  const openMessage = (day) => {
    if (day <= currentDay && !openedDays[day]) {
      const newOpenedDays = { ...openedDays, [day]: true };
      setOpenedDays(newOpenedDays);
      saveProgress(newOpenedDays);
      setSelectedMessage(loveMessages.find(m => m.day === day));
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 3000);
    } else if (openedDays[day]) {
      setSelectedMessage(loveMessages.find(m => m.day === day));
    }
  };

  const closeModal = () => {
    setSelectedMessage(null);
  };

  const shareLink = () => {
    setShowShare(true);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setShowShare(false);
    }, 2000);
  };

  const openedCount = Object.keys(openedDays).length;

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(to bottom, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
    }}>
      {/* Falling snow effect */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white opacity-80"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-5%`,
              animation: `fall ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${10 + Math.random() * 10}px`
            }}
          >
            ❄️
          </div>
        ))}
      </div>

      {showAnimation && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.8}s`,
                animationDuration: '1.5s',
                fontSize: `${Math.random() * 20 + 25}px`
              }}
            >
              {['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto p-6 pb-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="text-8xl mb-4 animate-pulse">🎄</div>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6" style={{
              textShadow: '0 0 20px rgba(239, 68, 68, 0.5), 0 0 40px rgba(34, 197, 94, 0.3)',
              fontFamily: 'Pacifico, cursive'
            }}>
              Daily Prayer & Scripture
            </h1>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Star className="text-yellow-400" fill="currentColor" size={28} />
              <p className="text-xl md:text-3xl text-red-200" style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 600 }}>
                Grow together in faith this December
              </p>
              <Star className="text-yellow-400" fill="currentColor" size={28} />
            </div>
            
            <button
              onClick={shareLink}
              className="inline-flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-4 rounded-full transition-all shadow-lg hover:scale-105 backdrop-blur-sm text-lg md:text-xl font-semibold"
              style={{ fontFamily: 'Dancing Script, cursive' }}
            >
              <Share2 size={24} />
              Share This Calendar
            </button>
          </div>

          <div className="inline-block bg-gradient-to-r from-red-600 to-green-600 rounded-full px-10 py-4 shadow-2xl">
            <span className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'Pacifico, cursive' }}>
              🙏 {openedCount}/31 Days of Prayer
            </span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 md:gap-6 mb-12">
          {loveMessages.map((item) => {
            const isOpened = openedDays[item.day];
            const canOpen = item.day <= currentDay;
            const isToday = item.day === currentDay;

            return (
              <button
                key={item.day}
                onClick={() => openMessage(item.day)}
                disabled={!canOpen}
                className={`relative aspect-square rounded-2xl transition-all duration-300 transform ${
                  isOpened
                    ? 'bg-gradient-to-br from-red-600 to-green-600 shadow-2xl hover:scale-110'
                    : canOpen
                    ? 'bg-gradient-to-br from-red-500 to-red-700 shadow-xl hover:scale-110 hover:shadow-2xl'
                    : 'bg-gradient-to-br from-gray-700 to-gray-800 cursor-not-allowed opacity-40'
                } ${isToday && !isOpened ? 'ring-4 ring-yellow-400 animate-bounce' : ''}`}
                style={{
                  boxShadow: isOpened 
                    ? '0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(34, 197, 94, 0.4)'
                    : canOpen
                    ? '0 10px 40px rgba(239, 68, 68, 0.4)'
                    : 'none'
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 md:p-4">
                  {isOpened ? (
                    <>
                      <div className="text-4xl md:text-5xl mb-2 animate-pulse">{item.emoji}</div>
                      <span className="text-white text-2xl md:text-3xl font-bold mb-1">{item.day}</span>
                      <Sparkles className="text-yellow-300" size={16} />
                    </>
                  ) : canOpen ? (
                    <>
                      <Gift className="text-white mb-2 animate-pulse" size={32} />
                      <span className="text-white text-2xl md:text-3xl font-bold">{item.day}</span>
                      {isToday && (
                        <span className="text-yellow-300 text-xs md:text-sm font-bold mt-1 animate-pulse">
                          Today!
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <Lock className="text-gray-400 mb-2" size={28} />
                      <span className="text-gray-400 text-2xl md:text-3xl font-bold">{item.day}</span>
                    </>
                  )}
                </div>

                {/* Ribbon decoration */}
                {canOpen && !isOpened && (
                  <>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-yellow-400 opacity-60"></div>
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-1 bg-yellow-400 opacity-60"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-6 h-6 bg-yellow-400 rotate-45 shadow-lg"></div>
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom decoration */}
        <div className="text-center">
          <div className="flex justify-center gap-4 text-4xl md:text-6xl mb-4">
            <span className="animate-pulse">🎅</span>
            <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>⛄</span>
            <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>🎁</span>
            <span className="animate-pulse" style={{ animationDelay: '0.6s' }}>🔔</span>
            <span className="animate-pulse" style={{ animationDelay: '0.8s' }}>⭐</span>
          </div>
          <p className="text-red-200 text-base md:text-lg" style={{ fontFamily: 'Dancing Script, cursive' }}>
            🙏 Open each day to pray together
          </p>
          <p className="text-red-300 text-lg md:text-xl mt-2 font-semibold" style={{ fontFamily: 'Satisfy, cursive' }}>
            Growing in faith together for 4 years 💕
          </p>
        </div>
      </div>

      {/* Share Modal */}
      {showShare && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={() => setShowShare(false)}
        >
          <div 
            className="bg-gradient-to-br from-red-600 to-green-700 rounded-3xl shadow-2xl max-w-md w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎁</div>
              <h3 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Pacifico, cursive' }}>
                Share This Calendar
              </h3>
              <p className="text-red-100 text-lg" style={{ fontFamily: 'Dancing Script, cursive' }}>
                Send this link to open together!
              </p>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-xl p-4 mb-6 backdrop-blur-sm">
              <p className="text-white text-sm break-all font-mono">
                {window.location.href}
              </p>
            </div>

            <button
              onClick={copyLink}
              className="w-full bg-white text-red-700 px-6 py-5 rounded-full font-bold text-xl hover:bg-opacity-90 transition-all shadow-xl flex items-center justify-center gap-2"
              style={{ fontFamily: 'Dancing Script, cursive' }}
            >
              {copied ? (
                <>
                  <Check size={28} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={28} />
                  Copy Link
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {selectedMessage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="bg-gradient-to-br from-red-600 via-red-700 to-green-700 rounded-3xl shadow-2xl max-w-2xl w-full p-8 md:p-10 transform animate-scaleIn relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 0 60px rgba(239, 68, 68, 0.8), 0 0 100px rgba(34, 197, 94, 0.5)'
            }}
          >
            {/* Modal snow effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-white opacity-30"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    fontSize: `${10 + Math.random() * 15}px`
                  }}
                >
                  ❄️
                </div>
              ))}
            </div>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="text-6xl md:text-8xl mb-4 animate-bounce">{selectedMessage.emoji}</div>
                <div className="bg-white bg-opacity-20 rounded-full px-6 py-2 inline-block mb-4">
                  <span className="text-white text-2xl md:text-3xl font-bold">
                    December {selectedMessage.day}
                  </span>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-3xl p-8 md:p-10 mb-8 shadow-2xl">
                <div className="mb-6">
                  <div className="text-purple-600 text-sm font-bold mb-3" style={{ fontFamily: 'Dancing Script, cursive' }}>
                    📖 Today's Scripture
                  </div>
                  <p className="text-gray-800 text-xl md:text-2xl font-bold leading-relaxed text-center mb-6" style={{ fontFamily: 'Dancing Script, cursive' }}>
                    {selectedMessage.message}
                  </p>
                </div>
                <div className="border-t-2 border-purple-200 pt-6">
                  <div className="text-purple-600 text-sm font-bold mb-3" style={{ fontFamily: 'Dancing Script, cursive' }}>
                    🙏 Prayer Focus
                  </div>
                  <p className="text-gray-700 text-lg md:text-xl leading-relaxed text-center" style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 600 }}>
                    {selectedMessage.prayer}
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={closeModal}
                  className="bg-white text-red-700 px-10 md:px-12 py-4 md:py-5 rounded-full font-bold text-xl md:text-2xl hover:bg-opacity-90 transition-all shadow-2xl hover:scale-105"
                  style={{ fontFamily: 'Dancing Script, cursive' }}
                >
                  Close 🎄
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.5) rotate(-10deg);
            opacity: 0;
          }
          to {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
};

export default LoveMessageCalendar;
